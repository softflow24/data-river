import { createExecutionEngine } from "@execution-engine";
import { createExecutionEngineConfig } from "@execution-engine/config/ExecutionEngineConfig";
import { IEnvironment, IConnection, IBlockConfig } from "@shared/interfaces";
import WebSocket from "ws";

const environment: IEnvironment = {
  variables: { apiKey: process.env.API_KEY || "test" },
};

const connections: IConnection[] = [
  { from: "Start", to: "Input", inputKey: "data", outputKey: "data" },
  { from: "Input", to: "Output", inputKey: "data", outputKey: "data" },
  { from: "Output", to: "End", inputKey: "data", outputKey: "data" },
];

const blockConfigs: IBlockConfig[] = [
  {
    id: "Start",
    type: "blocks/start@0.1",
    inputs: {},
    outputs: {},
  },
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
  {
    id: "End",
    type: "blocks/end@0.1",
    inputs: {},
    outputs: {},
  },
];

const wss = new WebSocket.Server({ port: 8080 });

async function runWorkflow(isServer: boolean) {
  const config = createExecutionEngineConfig({
    workflowConfig: {
      maxConcurrentTasks: 1,
      executionContext: "server",
      supportsWebSocket: true,
      retryOnFailure: false,
      connections,
    },
    environment,
  });

  const engine = createExecutionEngine(config, wss);
  await engine.executeWorkflow(blockConfigs);
  console.log(
    `Workflow executed in ${isServer ? "server" : "browser"} environment`,
  );
}

runWorkflow(true);
