import {
  IBlockConfig,
  IWorkflowConfig,
  IEnvironment,
  IWorkflowState,
  IConnection,
} from "@shared/interfaces";
import { createBlock, Block } from "@blocks";

import { VariableResolver } from "./VariableResolver";

export class ExecutionEngine {
  private config: IWorkflowConfig;
  private workflowState: IWorkflowState;
  private environment: IEnvironment;
  private variableResolver: VariableResolver;
  private connections: IConnection[];

  constructor(
    config: IWorkflowConfig,
    environment: IEnvironment,
    variableResolver: VariableResolver,
    connections: IConnection[],
  ) {
    this.config = config;
    this.workflowState = {};
    this.environment = environment;
    this.variableResolver = variableResolver;
    this.connections = connections;

    // Set initial environment variables
    this.variableResolver.setScope("environment", this.environment.variables);
  }

  async executeWorkflow(blockConfigs: IBlockConfig[]): Promise<void> {
    for (const blockConfig of blockConfigs) {
      try {
        const block = createBlock(blockConfig);
        await this.executeBlockWithRetry(block, blockConfig);
      } catch (error) {
        if (blockConfig.onError) {
          blockConfig.onError(error as Error, blockConfig);
        }
        // Additional error handling logic
      }
    }
  }

  private async executeBlockWithRetry(
    block: Block,
    blockConfig: IBlockConfig,
  ): Promise<Record<string, any>> {
    const retryCount = blockConfig.retry || 0;
    let attempts = 0;
    while (attempts <= retryCount) {
      try {
        const inputs = this.getInputsForBlock(blockConfig.id);
        const resolvedInputs = this.resolveVariables(inputs);
        const outputs = await block.execute(resolvedInputs);
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
