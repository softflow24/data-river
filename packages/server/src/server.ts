import express, { Application, Request, Response } from "express";
import { IBlockConfig } from "@shared/interfaces";
import { StartBlock } from "@blocks";
import WS from "ws";

const app: Application = express();
const port: number = 3000;
const wss = new WS.Server({ port: 8080 });

app.use(express.json());

app.post("/execute", (req: Request, res: Response) => {
  const blockConfig: IBlockConfig = req.body;
  // TODO: Use BlockFactory to create the block
  const startBlock = new StartBlock(blockConfig);
  if (!blockConfig.inputs) {
    res.status(400).json({ error: "Inputs are required" });
    return;
  }
  const outputs = startBlock.execute(blockConfig.inputs);
  res.json({ outputs });
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const blockConfig: IBlockConfig = JSON.parse(message.toString());
    // TODO: Use BlockFactory to create the block
    const simpleBlock = new StartBlock(blockConfig);
    if (!blockConfig.inputs) {
      ws.send(JSON.stringify({ error: "Inputs are required" }));
      return;
    }
    const outputs = simpleBlock.execute(blockConfig.inputs);
    ws.send(JSON.stringify({ outputs }));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
