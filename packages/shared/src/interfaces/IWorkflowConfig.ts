import { IConnection } from "./IConnection";

export interface IWorkflowConfig {
  maxConcurrentTasks: number;
  supportsWebSocket: boolean;
  executionContext: "browser" | "server";
  retryOnFailure?: boolean;
  continueOnError?: boolean;
  connections: IConnection[];
}
