import express, { Application, Request, Response } from "express";
import { IBlockConfig } from "@shared/interfaces";
import { createExecutionEngine } from "@execution-engine";
import * as WS from "ws";
import {
  createExecutionEngineConfig,
  IExecutionEngineConfig,
} from "@execution-engine/config/ExecutionEngineConfig";
import logger from "@shared/utils/logger";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8080;

app.use(express.json());

const wss = new WS.Server({ port: Number(WS_PORT) });

const engineConfig: IExecutionEngineConfig = createExecutionEngineConfig({
  workflowConfig: {
    maxConcurrentTasks: 1,
    supportsWebSocket: true,
    retryOnFailure: false,
    executionContext: "server",
    connections: [],
  },
  environment: { variables: {} },
  maxConcurrentTasks: 1,
  supportsWebSocket: true,
  retryOnFailure: false,
});

const engine = createExecutionEngine(engineConfig, wss);

app.post("/execute", async (req: Request, res: Response) => {
  const blockConfig: IBlockConfig = req.body;

  if (
    !blockConfig ||
    !blockConfig.inputs ||
    typeof blockConfig.inputs !== "object"
  ) {
    res.status(400).json({ error: "Invalid block configuration or inputs" });
    return;
  }

  try {
    const outputs = await engine.executeWorkflow([blockConfig]);
    res.json({ outputs });
  } catch (error: unknown) {
    res
      .status(500)
      .json({ error: "Execution failed", message: (error as Error).message });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
  logger.info(`WebSocket server running at ws://localhost:${WS_PORT}`);
});
