import { IBlockConfig, IBlock } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import {
  RequestBlock,
  StartBlock,
  EndBlock,
  InputBlock,
  OutputBlock,
  LogicBlock,
  CodeBlock,
} from "..";

type BlockConstructor = new (config: IBlockConfig, logger: ILogger) => IBlock;
type AsyncBlockConstructor = () => Promise<BlockConstructor>;

const blockRegistry: Record<string, BlockConstructor | AsyncBlockConstructor> =
  {
    "blocks/start@0.1": StartBlock,
    "blocks/end@0.1": EndBlock,
    "blocks/input@0.1": InputBlock,
    "blocks/output@0.1": OutputBlock,
    "blocks/logic@0.1": LogicBlock,
    "blocks/request@0.1": RequestBlock,
    "blocks/code@0.1": CodeBlock,
  };

export async function createBlock(
  config: IBlockConfig,
  logger: ILogger,
): Promise<IBlock> {
  const BlockClass = blockRegistry[config.type];
  if (!BlockClass) {
    throw new Error(`Unknown block type: ${config.type}`);
  }

  if (BlockClass.prototype && BlockClass.prototype.constructor) {
    // It's a synchronous constructor
    return new (BlockClass as BlockConstructor)(config, logger);
  } else {
    // It's an asynchronous constructor
    const AsyncBlockClass = await (BlockClass as AsyncBlockConstructor)();
    return new AsyncBlockClass(config, logger);
  }
}

/**
 * Allows external plugins to register new block types.
 */
export function registerBlockType(
  type: string,
  blockClassOrImporter: BlockConstructor | AsyncBlockConstructor,
) {
  blockRegistry[type] = blockClassOrImporter;
}
