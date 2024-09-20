import { IBlock, IBlockConfig } from "@shared/interfaces";

export interface IExecutionStrategy {
  execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  createBlockInstance(blockConfig: IBlockConfig): IBlock;
}
