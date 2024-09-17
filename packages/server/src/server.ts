import express, { Application, Request, Response } from "express";
import { IBlockConfig } from "@data-river/shared/interfaces";
import SimpleBlock from "@blocks/simple-block";
import WS from "ws";

const app: Application = express();
const port: number = 3000;
const wss = new WS.Server({ port: 8080 });

app.use(express.json());

app.post("/execute", (req: Request, res: Response) => {
  const blockConfig: IBlockConfig = req.body;
  const simpleBlock = new SimpleBlock(blockConfig);
  const outputs = simpleBlock.process(blockConfig.inputs);
  res.json({ outputs });
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const blockConfig: IBlockConfig = JSON.parse(message.toString());
    const simpleBlock = new SimpleBlock(blockConfig);
    const outputs = simpleBlock.process(blockConfig.inputs);
    ws.send(JSON.stringify({ outputs }));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
