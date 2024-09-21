import WebSocket from "ws";

import { IExecutionEngineConfig } from "./config/ExecutionEngineConfig";
import { configureDI, container } from "./di/container";
import { ExecutionEngine } from "./ExecutionEngine";
import { VariableResolver } from "./VariableResolver";

export function createExecutionEngine(
  config: IExecutionEngineConfig,
  wss?: WebSocket.Server,
): ExecutionEngine {
  const isServer = config.workflowConfig.executionContext === "server";
  configureDI(isServer, wss);

  const { workflowConfig, environment } = config;

  container.register("WorkflowConfig", { useValue: workflowConfig });
  container.register("Environment", { useValue: environment });
  container.register(VariableResolver, { useClass: VariableResolver });

  return container.resolve(ExecutionEngine);
}
