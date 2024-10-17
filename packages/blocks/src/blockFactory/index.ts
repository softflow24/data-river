import { IBlockConfig, IBlock } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import {
  RequestBlock,
  StartBlock,
  EndBlock,
  InputBlock,
  OutputBlock,
  LogicBlock,
} from "..";

type BlockConstructor = new (config: IBlockConfig, logger: ILogger) => IBlock;

const blockRegistry: Record<string, BlockConstructor> = {
  "blocks/start@0.1": StartBlock,
  "blocks/end@0.1": EndBlock,
  "blocks/input@0.1": InputBlock,
  "blocks/output@0.1": OutputBlock,
  "blocks/logic@0.1": LogicBlock,
  "blocks/request@0.1": RequestBlock,
};

export function createBlock(config: IBlockConfig, logger: ILogger): IBlock {
  const BlockClass = blockRegistry[config.type];
  if (!BlockClass) {
    throw new Error(`Unknown block type: ${config.type}`);
  }
  return new BlockClass(config, logger);
}

/**
 * Allows external plugins to register new block types.
 */
export function registerBlockType(type: string, blockClass: BlockConstructor) {
  blockRegistry[type] = blockClass;
}
