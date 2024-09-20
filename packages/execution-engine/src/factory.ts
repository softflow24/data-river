import { IWorkflowConfig, IEnvironment, IConnection } from "@shared/interfaces";
import WebSocket from "ws";

import { configureDI, container } from "./di/container";
import { ExecutionEngine } from "./ExecutionEngine";
import { VariableResolver } from "./VariableResolver";

export function createExecutionEngine(
  isServer: boolean,
  config: IWorkflowConfig,
  environment: IEnvironment,
  connections: IConnection[],
  wss?: WebSocket.Server,
): ExecutionEngine {
  configureDI(isServer, wss);

  container.register("WorkflowConfig", { useValue: config });
  container.register("Environment", { useValue: environment });
  container.register("Connections", { useValue: connections });
  container.register(VariableResolver, { useClass: VariableResolver });

  return container.resolve(ExecutionEngine);
}
