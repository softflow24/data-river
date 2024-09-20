import { IBlock, IBlockConfig } from "@shared/interfaces";
import { StartBlock } from "@blocks";

import { IExecutionStrategy } from "./IExecutionStrategy";

export class BrowserExecutionStrategy implements IExecutionStrategy {
  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const block = this.createBlockInstance(blockConfig);
    return block.execute(inputs);
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return new StartBlock(blockConfig); // Example only, replace with actual block instance creation logic
  }
}
