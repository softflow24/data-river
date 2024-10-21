import { injectable } from "tsyringe";
import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";
import { createBlock } from "@data-river/blocks/blockFactory";

import { IExecutionStrategy } from "./IExecutionStrategy";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

@injectable()
export class BrowserExecutionStrategy implements IExecutionStrategy {
  async execute(blockConfig: IBlockConfig, logger: ILogger): Promise<IBlock> {
    const block = await this.createBlockInstance(blockConfig, logger);
    await block.safeExecute(blockConfig.inputs ?? {}, blockConfig.config ?? {});
    return block;
  }

  createBlockInstance(
    blockConfig: IBlockConfig,
    logger: ILogger,
  ): Promise<IBlock> {
    return createBlock(blockConfig, logger);
  }
}
