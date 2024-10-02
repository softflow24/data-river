// server/index.ts
import { createExecutionEngine } from "@execution-engine";
import { createExecutionEngineConfig } from "@execution-engine/config/ExecutionEngineConfig";
import { IEnvironment, IConnection, IBlockConfig } from "@shared/interfaces";
import WebSocket from "ws";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "@shared/utils/logger";

const app = express();
const port = 4123;
const wss = new WebSocket.Server({ noServer: true });

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post("/run-workflow", async (req, res) => {
  const { blockConfigs, connections } = req.body;

  const environment: IEnvironment = {
    variables: { apiKey: process.env.API_KEY || "env-resolver-value" },
  };

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

  try {
    await engine.executeWorkflow(blockConfigs);
    logger.info("Workflow executed with configs:", blockConfigs);
    res.json({ status: "Workflow executed successfully" });
  } catch (error) {
    logger.error("Workflow execution failed:", error);
    res.status(500).json({
      status: "Workflow execution failed",
      error: (error as Error).message,
    });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket as any, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
