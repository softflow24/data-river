import { injectable } from "tsyringe";
import { IBlock, IBlockConfig } from "@shared/interfaces";
import { createBlock } from "@blocks/blockFactory";

import { IExecutionStrategy } from "./IExecutionStrategy";

@injectable()
export class BrowserExecutionStrategy implements IExecutionStrategy {
  async execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const block = this.createBlockInstance(blockConfig);
    return block.execute(inputs);
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return createBlock(blockConfig);
  }
}
