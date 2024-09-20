import { IBlock, IBlockConfig } from "@shared/interfaces";
import { StartBlock } from "@blocks";

import { IExecutionStrategy } from "./IExecutionStrategy";

export class ServerExecutionStrategy implements IExecutionStrategy {
  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, any>,
  ): Promise<Record<string, any>> {
    const block = this.createBlockInstance(blockConfig);
    return block.execute(inputs);
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return new StartBlock(blockConfig); // Example only, replace with actual block instance creation logic
  }
}
