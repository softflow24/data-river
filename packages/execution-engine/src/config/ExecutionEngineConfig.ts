import { IWorkflowConfig, IEnvironment } from "@shared/interfaces";

export interface IExecutionEngineConfig {
  workflowConfig: IWorkflowConfig;
  environment: IEnvironment;
  maxConcurrentTasks: number;
  retryOnFailure: boolean;
  supportsWebSocket: boolean;
}

export function createExecutionEngineConfig(
  config: Partial<IExecutionEngineConfig>,
): IExecutionEngineConfig {
  return {
    workflowConfig: config.workflowConfig || {
      maxConcurrentTasks: 1,
      executionContext: "server",
      supportsWebSocket: true,
      connections: [],
    },
    environment: config.environment || { variables: {} },
    maxConcurrentTasks: config.maxConcurrentTasks || 1,
    retryOnFailure: config.retryOnFailure || false,
    supportsWebSocket: config.supportsWebSocket || false,
  };
}
