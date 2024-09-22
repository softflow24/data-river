import { injectable } from "tsyringe";
import { IBlock, IBlockConfig } from "@shared/interfaces";
import { createBlock } from "@blocks/blockFactory";

import { IExecutionStrategy } from "./IExecutionStrategy";

@injectable()
export class BrowserExecutionStrategy implements IExecutionStrategy {
  async execute(blockConfig: IBlockConfig): Promise<IBlock> {
    const block = this.createBlockInstance(blockConfig);
    await block.safeExecute(blockConfig.inputs ?? {});
    return block;
  }

  createBlockInstance(blockConfig: IBlockConfig): IBlock {
    return createBlock(blockConfig);
  }
}
