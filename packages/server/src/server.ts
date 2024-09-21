import express, { Application, Request, Response } from "express";
import { IBlockConfig } from "@shared/interfaces";
import { createExecutionEngine, ExecutionEngineConfig } from "@execution-engine";
import * as WS from "ws";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 8080;

app.use(express.json());

const engineConfig: ExecutionEngineConfig = {
  maxConcurrentTasks: 1,
  executionContext: "server",
  supportsWebSocket: true,
  retryOnFailure: false,
};

const wss = new WS.Server({ port: WS_PORT });

const engine = createExecutionEngine(engineConfig, { variables: {} }, [], wss);

app.post("/execute", async (req: Request, res: Response) => {
  const blockConfig: IBlockConfig = req.body;
  
  if (!blockConfig || !blockConfig.inputs || typeof blockConfig.inputs !== "object") {
    res.status(400).json({ error: "Invalid block configuration or inputs" });
    return;
  }
  
  try {
    const outputs = await engine.executeWorkflow([blockConfig]);
    res.json({ outputs });
  } catch (error) {
    res.status(500).json({ error: "Execution failed", message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`WebSocket server running at ws://localhost:${WS_PORT}`);
});