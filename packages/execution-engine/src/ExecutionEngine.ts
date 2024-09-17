import {
  IBlockConfig,
  IWorkflowConfig,
  IEnvironment,
  IWorkflowState,
  IWorkflow,
  IConnection,
} from "@data-river/shared/interfaces";

import { IExecutionStrategy } from "./strategies/IExecutionStrategy";
import { VariableResolver } from "./VariableResolver";

export class ExecutionEngine {
  private config: IWorkflowConfig;
  private workflowState: IWorkflowState;
  private environment: IEnvironment;
  private variableResolver: VariableResolver;
  private executionStrategy: IExecutionStrategy;
  private connections: IConnection[];

  constructor(
    config: IWorkflowConfig,
    environment: IEnvironment,
    executionStrategy: IExecutionStrategy,
    variableResolver: VariableResolver,
    connections: IConnection[],
  ) {
    this.config = config;
    this.workflowState = {};
    this.environment = environment;
    this.executionStrategy = executionStrategy;
    this.variableResolver = variableResolver;
    this.connections = connections;

    // Set initial environment variables
    this.variableResolver.setScope("environment", this.environment.variables);
  }

  async executeWorkflow(blocks: IBlockConfig[]): Promise<void> {
    for (const blockConfig of blocks) {
      try {
        await this.executeBlockWithRetry(blockConfig);
      } catch (error) {
        if (blockConfig.onError) {
          blockConfig.onError(error as Error, blockConfig);
        }
        // Additional error handling logic (logging, fallback, etc.)
      }
    }
  }

  private async executeBlockWithRetry(
    blockConfig: IBlockConfig,
  ): Promise<Record<string, any>> {
    const retryCount = blockConfig.retry || 0;
    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        const inputs = this.getInputsForBlock(blockConfig.id);
        const resolvedInputs = this.resolveVariables(inputs);
        const outputs = await this.executionStrategy.execute(
          blockConfig,
          resolvedInputs,
        );
        this.handleBlockOutputs(blockConfig, outputs);
        return outputs;
      } catch (error) {
        attempts++;
        if (attempts > retryCount) {
          throw error;
        }
      }
    }
    throw new Error(
      `Maximum retry attempts reached for block ${blockConfig.id}`,
    );
  }

  private getInputsForBlock(blockId: string): Record<string, any> {
    const inputs: Record<string, any> = {};
    this.connections
      .filter((conn) => conn.to === blockId)
      .forEach((conn) => {
        inputs[conn.inputKey] = this.workflowState[conn.from]?.[conn.outputKey];
      });
    return inputs;
  }

  private handleBlockOutputs(
    blockConfig: IBlockConfig,
    outputs: Record<string, any>,
  ): void {
    this.updateWorkflowState(blockConfig.id, outputs);
    // Additional logic to pass outputs to connected blocks
  }

  private resolveVariables(inputs: Record<string, any>): Record<string, any> {
    const resolvedInputs: Record<string, any> = {};
    for (const [key, value] of Object.entries(inputs)) {
      resolvedInputs[key] =
        typeof value === "string"
          ? this.variableResolver.resolve(value)
          : value;
    }
    return resolvedInputs;
  }

  private updateWorkflowState(blockId: string, data: Record<string, any>) {
    this.workflowState[blockId] = data;
  }

  getWorkflowState(): IWorkflowState {
    return this.workflowState;
  }
}
