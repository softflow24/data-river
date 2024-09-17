import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";

export interface IExecutionStrategy {
  execute(
    blockConfig: IBlockConfig,
    inputs: Record<string, any>,
  ): Promise<Record<string, any>>;
  createBlockInstance(blockConfig: IBlockConfig): IBlock;
}
