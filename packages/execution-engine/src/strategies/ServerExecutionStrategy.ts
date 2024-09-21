import { injectable, inject } from "tsyringe";
import { IBlock, IBlockConfig } from "@shared/interfaces";
import { createBlock } from "@blocks/blockFactory";
import WebSocket from "ws";

import { IExecutionStrategy } from "./IExecutionStrategy";

@injectable()
export class ServerExecutionStrategy implements IExecutionStrategy {
  private wss?: WebSocket.Server;

  constructor(
    @inject("WebSocketServerFactory")
    private wssFactory: () => WebSocket.Server | undefined,
  ) {
    try {
      this.wss = this.wssFactory();
    } catch (error) {
      console.warn("WebSocket server initialization failed:", error);
    }
  }

  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const block = this.createBlockInstance(blockConfig);
    const outputs = await block.execute(inputs);

    // Send real-time updates via WebSocket if available
    if (this.wss && this.wss.clients) {
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ blockId: blockConfig.id, outputs }));
        }
      });
    }

    return outputs;
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return createBlock(blockConfig);
  }
}
