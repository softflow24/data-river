import { IBlockConfig, IBlock } from "@shared/interfaces";

import { StartBlock } from "../startBlock";
import { EndBlock } from "../endBlock";
import { InputBlock } from "../inputBlock";
import { OutputBlock } from "../outputBlock";

// eslint-disable-next-line no-unused-vars
const blockRegistry: Record<string, new (config: IBlockConfig) => IBlock> = {
  "blocks/start@0.1": StartBlock,
  "blocks/end@0.1": EndBlock,
  "blocks/input@0.1": InputBlock,
  "blocks/output@0.1": OutputBlock,
};

export function createBlock(config: IBlockConfig): IBlock {
  const BlockClass = blockRegistry[config.type];
  if (!BlockClass) {
    throw new Error(`Unknown block type: ${config.type}`);
  }
  return new BlockClass(config);
}

/**
 * Allows external plugins to register new block types.
 */
export function registerBlockType(
  type: string,
  // eslint-disable-next-line no-unused-vars
  blockClass: new (config: IBlockConfig) => IBlock,
) {
  blockRegistry[type] = blockClass;
}
