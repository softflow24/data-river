import { IBlock, IBlockConfig } from "@shared/interfaces";

export abstract class Block implements IBlock {
  id: string;
  type: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  retry: number;
  timeout: number;
  // eslint-disable-next-line no-unused-vars
  onError: (error: Error, blockConfig: IBlockConfig) => void;

  constructor(config: IBlockConfig) {
    this.id = config.id;
    this.type = config.type;
    this.inputs = config.inputs || {};
    this.outputs = config.outputs || {};
    this.retry = config.retry || 0;
    this.timeout = config.timeout || 0;
    this.onError = config.onError || (() => {});
  }

  /**
   * Abstract method to execute the block's main functionality.
   */
  // eslint-disable-next-line no-unused-vars
  abstract execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;

  /**
   * Handle errors that occur during execution.
   */
  handleError(error: Error): void {
    if (this.onError) {
      this.onError(error, {
        id: this.id,
        type: this.type,
        inputs: this.inputs,
        outputs: this.outputs,
        retry: this.retry,
        timeout: this.timeout,
        onError: this.onError,
      });
    }
  }
}
