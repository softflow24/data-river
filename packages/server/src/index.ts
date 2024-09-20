import { createExecutionEngine } from "@execution-engine";
import {
  IWorkflowConfig,
  IEnvironment,
  IConnection,
  IBlockConfig,
} from "@shared/interfaces";
import WebSocket from "ws";

const config: IWorkflowConfig = {
  maxConcurrentTasks: 1,
  executionContext: "server",
  supportsWebSocket: true,
  retryOnFailure: false,
};

const environment: IEnvironment = {
  variables: { apiKey: "test_key" },
};

const connections: IConnection[] = [
  { from: "Start", to: "Input", inputKey: "data", outputKey: "data" },
  { from: "Input", to: "Output", inputKey: "data", outputKey: "data" },
  { from: "Output", to: "End", inputKey: "data", outputKey: "data" },
];

const blockConfigs: IBlockConfig[] = [
  { id: "Start", type: "blocks/start@0.1", inputs: {}, outputs: {} },
  {
    id: "Input",
    type: "blocks/input@0.1",
    inputs: {},
    outputs: { data: "data" },
  },
  {
    id: "Output",
    type: "blocks/output@0.1",
    inputs: { data: "data" },
    outputs: {},
  },
  { id: "End", type: "blocks/end@0.1", inputs: {}, outputs: {} },
];

const wss = new WebSocket.Server({ port: 8080 });

async function runWorkflow(isServer: boolean) {
  const engine = createExecutionEngine(
    isServer,
    config,
    environment,
    connections,
    wss,
  );
  await engine.executeWorkflow(blockConfigs);
  console.log(
    `Workflow executed in ${isServer ? "server" : "browser"} environment`,
  );
}

runWorkflow(true);
