/* eslint-disable no-unused-vars */
import { IBlockConfig } from ".";

export interface IBlock {
  id: string;
  type: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  retry: number;
  timeout: number;
  onError: (error: Error, blockConfig: IBlockConfig) => void;
  execute(inputs: Record<string, unknown>): Promise<Record<string, unknown>>;
  safeExecute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  handleError(error: Error): void;
}
