import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";
import SimpleBlock from "@blocks/simple-block";

import { IExecutionStrategy } from "./IExecutionStrategy";

export class BrowserExecutionStrategy implements IExecutionStrategy {
  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, any>,
  ): Promise<Record<string, any>> {
    const block = this.createBlockInstance(blockConfig);
    return block.process(inputs);
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return new SimpleBlock(blockConfig); // Example only, replace with actual block instance creation logic
  }
}
