import { createExecutionEngine } from "@execution-engine";
import { createExecutionEngineConfig } from "@execution-engine/config/ExecutionEngineConfig";
import { IEnvironment, IConnection, IBlockConfig } from "@shared/interfaces";
import WebSocket from "ws";
import logger from "@shared/utils/logger";

const environment: IEnvironment = {
  variables: { apiKey: process.env.API_KEY || "env-resolver-value" },
};

const connections: IConnection[] = [
  { from: "Start", to: "Input", inputKey: "trigger", outputKey: "started" },
  { from: "Input", to: "Output", inputKey: "data", outputKey: "data" },
  { from: "Output", to: "End", inputKey: "data", outputKey: "data" },
];

const blockConfigs: IBlockConfig[] = [
  {
    id: "Start",
    type: "blocks/start@0.1",
  },
  {
    id: "Input",
    type: "blocks/input@0.1",
    inputs: {
      input: "Sample User Input with an env variable {{apiKey}}", // Add this line to provide the required input
    },
  },
  {
    id: "Output",
    type: "blocks/output@0.1",
  },
  {
    id: "End",
    type: "blocks/end@0.1",
  },
];

const wss = new WebSocket.Server({ port: 4123 });

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
  logger.info(
    `Workflow executed in ${isServer ? "server" : "browser"} environment`,
  );
}

runWorkflow(true);
