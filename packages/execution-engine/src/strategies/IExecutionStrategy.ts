import { IBlock, IBlockConfig } from "@shared/interfaces";

export interface IExecutionStrategy {
  execute(blockConfig: IBlockConfig): Promise<IBlock>;
}
