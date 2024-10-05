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

    let output: IExecutionResult = {
      result: [],
      errors: [],
    };
    for (const blockConfig of blockConfigs) {
      try {
        const inputs = this.getInputsForBlock(blockConfig);
        const resolvedInputs = this.resolveVariables(inputs);
        this.logger.debug(`Executing block: ${blockConfig.id}`, {
          blockConfig,
          resolvedInputs,
        });

        const updatedConfig = { ...blockConfig, inputs: resolvedInputs };
        const outputs = await this.executeBlockWithRetry(updatedConfig);

        this.logger.debug(`Block ${blockConfig.id} execution completed`, {
          outputs,
        });
        this.handleBlockOutputs(blockConfig, outputs);
        output.result.push({
          nodeType: blockConfig.type,
          nodeId: blockConfig.id,
          outputs,
          inputs: resolvedInputs,
        });
      } catch (error) {
        const blockError = this.handleBlockError(error as Error, blockConfig);
        this.environment.errors[blockConfig.id] = blockError.errors;
        output.errors.push({ blockId: blockConfig.id, error: error as Error });
        break;
      }
    }

    this.logger.timeEnd("Workflow Execution");
    this.logger.groupEnd();
    return output;
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

  private getInputsForBlock(
    blockConfig: IBlockConfig,
  ): Record<string, unknown> {
    const inputs: Record<string, unknown> = {};
    this.connections
      .filter((conn) => conn.to === blockConfig.id)
      .forEach((conn) => {
        if (conn.from && conn.outputKey && conn.inputKey) {
          inputs[conn.inputKey] =
            this.workflowState[conn.from]?.[conn.outputKey];
        }
      });

    // Externally provided inputs
    if (blockConfig.inputs) {
      Object.entries(blockConfig.inputs).forEach(([key, value]) => {
        inputs[key] = value;
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
    // Additional logic to pass outputs to connected blocks could be implemented here
  }

  private handleBlockError(
    error: Error,
    blockConfig: IBlockConfig,
  ): {
    errors: Error[];
  } {
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
    this.logger.error(`Error in block ${blockConfig.id}:`, error);

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
