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

  async execute(blockConfig: IBlockConfig): Promise<IBlock> {
    const block = this.createBlockInstance(blockConfig);
    await block.safeExecute(blockConfig.inputs ?? {});

    // Send real-time updates via WebSocket if available
    if (this.wss && this.wss.clients) {
      this.wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ blockId: blockConfig.id, outputs: block.outputs }),
          );
        }
      });
    }

    return block;
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return createBlock(blockConfig);
  }
}
