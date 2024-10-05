import WebSocket from "ws";

import { IExecutionEngineConfig } from "./config/ExecutionEngineConfig";
import { configureDI, container } from "./di/container";
import { ExecutionEngine } from "./ExecutionEngine";
import { VariableResolver } from "./VariableResolver";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

export function createExecutionEngine(
  config: IExecutionEngineConfig,
  logger: ILogger,
  wss?: WebSocket.Server,
): ExecutionEngine {
  const isServer = config.workflowConfig.executionContext === "server";
  configureDI(isServer, wss);

  const { workflowConfig, environment } = config;

  container.register("WorkflowConfig", { useValue: workflowConfig });
  container.register("Environment", { useValue: environment });
  container.register(VariableResolver, { useClass: VariableResolver });
  container.register("Logger", { useValue: logger });

  return container.resolve(ExecutionEngine);
}
