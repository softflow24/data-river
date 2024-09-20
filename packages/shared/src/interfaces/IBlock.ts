/* eslint-disable no-unused-vars */
import { IBlockConfig } from ".";

export interface IBlock {
  id: string;
  type: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  retry: number;
  timeout: number;
  onError: (error: Error, blockConfig: IBlockConfig) => void;
  execute(inputs: Record<string, any>): Promise<Record<string, any>>;
  handleError(error: Error): void;
}
