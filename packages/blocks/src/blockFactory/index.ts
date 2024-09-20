import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";
import { StartBlock } from "../startBlock";
import { EndBlock } from "../endBlock";
import { InputBlock } from "../inputBlock";
import { OutputBlock } from "../outputBlock";
import { LogicBlock } from "../logicBlock";

const blockRegistry: Record<string, typeof Block> = {
  start: StartBlock,
  end: EndBlock,
  input: InputBlock,
  output: OutputBlock,
  logic: LogicBlock,
  // Additional blocks can be registered here, only built-in blocks are allowed. Rest are handled by plugins.
};

export function createBlock(config: IBlockConfig): Block {
  const BlockClass = blockRegistry[config.type];
  if (!BlockClass) {
    throw new Error(`Unknown block type: ${config.type}`);
  }
  if (BlockClass.prototype instanceof Block) {
    // eslint-disable-next-line no-unused-vars
    return new (BlockClass as new (config: IBlockConfig) => Block)(config);
  } else {
    throw new Error(`Invalid block class for type: ${config.type}`);
  }
}

/**
 * Allows external plugins to register new block types.
 */
export function registerBlockType(type: string, blockClass: typeof Block) {
  blockRegistry[type] = blockClass;
}
