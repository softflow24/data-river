import { inject, injectable } from "tsyringe";
import {
  IWorkflowConfig,
  IEnvironment,
  IConnection,
  IBlockConfig,
  IWorkflowState,
} from "@shared/interfaces";

import { VariableResolver } from "./VariableResolver";
import { IExecutionStrategy } from "./strategies/IExecutionStrategy";

@injectable()
export class ExecutionEngine {
  private workflowState: IWorkflowState = {};

  constructor(
    @inject("WorkflowConfig") private config: IWorkflowConfig,
    @inject("Environment") private environment: IEnvironment,
    @inject(VariableResolver) private variableResolver: VariableResolver,
    @inject("Connections") private connections: IConnection[],
    @inject("ExecutionStrategy") private executionStrategy: IExecutionStrategy,
  ) {
    this.variableResolver.setScope("environment", this.environment.variables);
  }

  async executeWorkflow(blockConfigs: IBlockConfig[]): Promise<void> {
    for (const blockConfig of blockConfigs) {
      try {
        const inputs = this.getInputsForBlock(blockConfig.id);
        const resolvedInputs = this.resolveVariables(inputs);
        const outputs = await this.executeBlockWithRetry(
          blockConfig,
          resolvedInputs,
        );
        this.handleBlockOutputs(blockConfig, outputs);
      } catch (error) {
        this.handleBlockError(error as Error, blockConfig);
      }
    }
  }

  private async executeBlockWithRetry(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const retryCount = blockConfig.retry || 0;
    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        return await this.executionStrategy.execute(blockConfig, inputs);
      } catch (error) {
        attempts++;
        if (attempts > retryCount) {
          throw error;
        }
        // Implement retry delay logic here if needed
      }
    }
    throw new Error(
      `Maximum retry attempts reached for block ${blockConfig.id}`,
    );
  }

  private getInputsForBlock(blockId: string): Record<string, unknown> {
    const inputs: Record<string, unknown> = {};
    this.connections
      .filter((conn) => conn.to === blockId)
      .forEach((conn) => {
        if (conn.from && conn.outputKey && conn.inputKey) {
          inputs[conn.inputKey] =
            this.workflowState[conn.from]?.[conn.outputKey];
        }
      });
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

  private handleBlockError(error: Error, blockConfig: IBlockConfig): void {
    if (blockConfig.onError) {
      blockConfig.onError(error, blockConfig);
    }
    // Log the error or perform additional error handling
    console.error(`Error in block ${blockConfig.id}:`, error);
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

  // Method to dynamically update workflow configuration
  updateConfig(newConfig: Partial<IWorkflowConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Method to dynamically update environment variables
  updateEnvironment(newVariables: Record<string, unknown>): void {
    this.environment.variables = {
      ...this.environment.variables,
      ...newVariables,
    };
    this.variableResolver.setScope("environment", this.environment.variables);
  }
}
