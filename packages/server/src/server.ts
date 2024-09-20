import express, { Application, Request, Response } from "express";
import { IBlockConfig } from "@shared/interfaces";
import { createExecutionEngine } from "@execution-engine";
import WS from "ws";

const app: Application = express();
const port: number = 3000;
const wss = new WS.Server({ port: 8080 });

app.use(express.json());

const engine = createExecutionEngine(
  true,
  {
    maxConcurrentTasks: 1,
    executionContext: "server",
    supportsWebSocket: true,
    retryOnFailure: false,
  },
  {
    variables: {},
  },
  [],
  wss,
);

app.post("/execute", async (req: Request, res: Response) => {
  const blockConfig: IBlockConfig = req.body;
  if (!blockConfig.inputs) {
    res.status(400).json({ error: "Inputs are required" });
    return;
  }
  const outputs = await engine.executeWorkflow([blockConfig]);
  res.json({ outputs });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("WebSocket server running at ws://localhost:8080");
});
