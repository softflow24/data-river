export interface IBlockConfig {
  id: string;
  type: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  retry?: number;
  timeout?: number;
  onError?: (error: Error, blockConfig: IBlockConfig) => void;
}

export interface IBlock {
  config: IBlockConfig;
  process(inputs: Record<string, any>): Promise<Record<string, any>>;
  onError?(error: Error, blockConfig: IBlockConfig): void;
}

export interface IWorkflowConfig {
  maxConcurrentTasks: number;
  supportsWebSocket: boolean;
  executionContext: "browser" | "server";
  retryOnFailure?: boolean;
}

export interface IEnvironment {
  variables: Record<string, any>;
}

export interface IWorkflowState {
  [key: string]: any;
}

export interface IConnection {
  from: string;
  to: string;
  inputKey: string;
  outputKey: string;
}

export interface IWorkflow {
  id: string;
  blocks: IBlockConfig[];
  connections: IConnection[];
  environment: IEnvironment;
  config: IWorkflowConfig;
}
