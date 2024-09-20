export interface IWorkflowConfig {
  maxConcurrentTasks: number;
  supportsWebSocket: boolean;
  executionContext: "browser" | "server";
  retryOnFailure?: boolean;
}
