import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import {
  IWorkflowConfig,
  IEnvironment,
  IConnection,
  IBlockConfig,
  IWorkflowState,
} from "@data-river/shared/interfaces";
import { IExecutionResult } from "@data-river/shared/interfaces/IExecutionResult";
import { VariableResolver } from "./VariableResolver";
import { IExecutionStrategy } from "./strategies/IExecutionStrategy";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

@injectable()
export class ExecutionEngine {
  private workflowState: IWorkflowState = {};
  private connections: IConnection[];
  private blocksMap: Map<string, IBlockConfig> = new Map();
  private executedBlocks: Set<string> = new Set();
  private output: IExecutionResult = {
    result: [],
    errors: [],
  };

  constructor(
    @inject("WorkflowConfig") private config: IWorkflowConfig,
    @inject("Environment") private environment: IEnvironment,
    @inject(VariableResolver) private variableResolver: VariableResolver,
    @inject("ExecutionStrategy") private executionStrategy: IExecutionStrategy,
    @inject("Logger") private logger: ILogger,
  ) {
    this.variableResolver.setScope("environment", this.environment.variables);
    this.connections = config.connections;
    this.logger = logger;
  }

  async executeWorkflow(
    blockConfigs: IBlockConfig[],
  ): Promise<IExecutionResult> {
    this.logger.group("Executing Workflow");
    this.logger.time("Workflow Execution");

    this.blocksMap = new Map(blockConfigs.map((block) => [block.id, block]));

    const startBlock = blockConfigs.find((block) =>
      block.type.startsWith("blocks/start@"),
    );

    if (!startBlock) {
      throw new Error("No start block found in the workflow");
    }

    await this.executeBlock(startBlock.id);

    this.logger.timeEnd("Workflow Execution");
    this.logger.groupEnd();
    return this.output;
  }

  private async executeBlock(
    blockId: string,
    shouldRunConnectedBlocks = true,
  ): Promise<void> {
    if (this.executedBlocks.has(blockId)) return;

    const blockConfig = this.blocksMap.get(blockId);
    if (!blockConfig) return;

    try {
      await this.runNodesConnectedToBlockThatDidNotRunYet(blockId);
      const inputs = this.getInputsForBlock(blockConfig);
      const resolvedInputs = this.resolveVariables(inputs);

      this.logger.debug(`Executing block: ${blockConfig.id}`, {
        blockConfig,
        resolvedInputs,
      });

      const updatedConfig = { ...blockConfig, inputs: resolvedInputs };
      const outputs = await this.executeBlockWithRetry(updatedConfig);

      this.logger.info(`Block ${blockConfig.id} execution completed`, {
        outputs,
      });
      this.handleBlockOutputs(blockConfig, outputs);
      this.output.result.push({
        nodeType: blockConfig.type,
        nodeId: blockConfig.id,
        outputs,
        inputs: resolvedInputs,
      });

      this.executedBlocks.add(blockId);

      if (!shouldRunConnectedBlocks) {
        return;
      }

      // Handle logic blocks
      if (blockConfig.type.startsWith("blocks/logic@")) {
        const nextBlockId = await this.evaluateLogicBlock(blockConfig, outputs);
        if (nextBlockId) {
          await this.executeBlock(nextBlockId);
        }
      } else {
        // For non-logic blocks, execute all connected blocks
        const connectedBlocks = this.getConnectedBlocks(blockConfig.id);
        for (const connectedBlock of connectedBlocks) {
          await this.executeBlock(connectedBlock);
        }
      }
    } catch (error) {
      const blockError = this.handleBlockError(error as Error, blockConfig);
      this.environment.errors[blockConfig.id] = blockError.errors;
      this.output.errors.push({
        blockId: blockConfig.id,
        error: error as Error,
      });
    }
  }

  private getConnectedBlocks(blockId: string): string[] {
    return this.connections
      .filter((conn) => conn.from === blockId)
      .map((conn) => conn.to);
  }

  private async evaluateLogicBlock(
    blockConfig: IBlockConfig,
    outputs: Record<string, unknown>,
  ): Promise<string | null> {
    const result = outputs.result as boolean;

    const trueConnection = this.connections.find(
      (conn) => conn.from === blockConfig.id && conn.sourceHandle?.match("if"),
    );
    const falseConnection = this.connections.find(
      (conn) =>
        conn.from === blockConfig.id && conn.sourceHandle?.match("else"),
    );

    this.logger.debug("Evaluating logic block", {
      connections: this.connections,
      blockConfig,
      outputs,
      trueConnection,
      falseConnection,
    });

    if (result && trueConnection) {
      return trueConnection.to;
    } else if (!result && falseConnection) {
      return falseConnection.to;
    }

    return null;
  }

  private async executeBlockWithRetry(
    blockConfig: IBlockConfig,
  ): Promise<Record<string, unknown>> {
    const retryCount = blockConfig.retry || 0;
    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        const block = await this.executionStrategy.execute(
          blockConfig,
          this.logger,
        );
        return block.outputs;
      } catch (error) {
        attempts++;
        if (attempts > retryCount) {
          this.logger.error(`Block ${blockConfig.id} execution failed`, {
            error,
          });
          throw error;
        }
      }
    }
    throw new Error(
      `Maximum retry attempts reached for block ${blockConfig.id}`,
    );
  }

  private async runNodesConnectedToBlockThatDidNotRunYet(blockId: string) {
    const connectionsBlocks = this.connections.filter(
      (conn) => conn.to === blockId,
    );

    for (const conn of connectionsBlocks) {
      if (this.workflowState[conn.from]) continue;
      await this.executeBlock(conn.from, false);
    }
  }

  private getInputsForBlock(
    blockConfig: IBlockConfig,
  ): Record<string, unknown> {
    const inputs: Record<string, unknown> = {};
    const connectionsBlocks = this.connections.filter(
      (conn) => conn.to === blockConfig.id,
    );

    for (const conn of connectionsBlocks) {
      if (conn.from && conn.outputKey && conn.inputKey) {
        inputs[conn.inputKey] = this.workflowState[conn.from]?.[conn.outputKey];
        if (inputs[conn.inputKey]) continue;
      }
    }

    this.logger.debug("Inputs for block", { inputs });

    // Externally provided inputs
    if (blockConfig.inputs) {
      Object.entries(blockConfig.inputs).forEach(([key, value]) => {
        if (inputs[key] === undefined) inputs[key] = value;
      });
    }

    return inputs;
  }

  private resolveVariables(
    inputs: Record<string, unknown>,
  ): Record<string, unknown> {
    const resolvedInputs: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(inputs)) {
      resolvedInputs[key] =
        typeof value === "string"
          ? this.variableResolver.resolve(value)
          : value;
    }
    return resolvedInputs;
  }

  private handleBlockOutputs(
    blockConfig: IBlockConfig,
    outputs: Record<string, unknown>,
  ): void {
    this.updateWorkflowState(blockConfig.id, outputs);
  }

  private handleBlockError(
    error: Error,
    blockConfig: IBlockConfig,
  ): {
    errors: Error[];
  } {
    this.logger.error(`Error in block ${blockConfig.id}:`, error);

    if (blockConfig.onError) {
      try {
        blockConfig.onError(error, blockConfig);
      } catch (error) {
        this.logger.error(
          `Error in block ${blockConfig.id} onError function:`,
          error,
        );
        return { errors: [error as Error] };
      }
    }

    return { errors: [error] };
  }

  private updateWorkflowState(blockId: string, data: Record<string, unknown>) {
    this.workflowState[blockId] = data;
  }

  getWorkflowState(): IWorkflowState {
    return this.workflowState;
  }

  // Additional methods for workflow management could be added here
  resetWorkflow(): void {
    this.workflowState = {};
  }

  pauseWorkflow(): void {
    // Implement logic to pause workflow execution
  }

  resumeWorkflow(): void {
    // Implement logic to resume workflow execution
  }
}
