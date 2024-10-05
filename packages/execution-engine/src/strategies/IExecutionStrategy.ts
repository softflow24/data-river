import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

export interface IExecutionStrategy {
  execute(blockConfig: IBlockConfig, logger: ILogger): Promise<IBlock>;
}
