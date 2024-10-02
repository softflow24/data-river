import { IBlock, IBlockConfig } from "@shared/interfaces";
import logger from "@shared/utils/logger";

export abstract class Block implements IBlock {
  readonly id: string;
  readonly type: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  private inputConfigs: Record<string, { type: string; required: boolean }>;
  private outputConfigs: Record<string, { type: string }>;
  readonly retry: number;
  readonly timeout: number;
  readonly onError: (error: Error, blockConfig: IBlockConfig) => void;

  constructor(config: IBlockConfig) {
    this.id = config.id;
    this.type = config.type;
    this.inputConfigs = config.inputConfigs ?? {};
    this.outputConfigs = config.outputConfigs ?? {};
    this.inputs = config.inputs ?? {};
    this.outputs = {};
    this.retry = config.retry || 0;
    this.timeout = config.timeout || 0;
    this.onError = config.onError || (() => {});
  }

  abstract execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;

  protected setOutput(key: string, value: unknown): void {
    if (!(key in this.outputConfigs)) {
      throw new Error(`Invalid output key: ${key}`);
    }
    if (typeof value !== this.outputConfigs[key].type) {
      throw new Error(`Invalid output type for key ${key}`);
    }
    this.outputs[key] = value;
  }

  validateInputs(inputs: Record<string, unknown>): boolean {
    const cleanedInputs: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(inputs)) {
      if (key in this.inputConfigs && value !== undefined && value !== null) {
        cleanedInputs[key] = value;
      }
    }

    for (const [key, config] of Object.entries(this.inputConfigs)) {
      if (config.required && !(key in cleanedInputs)) {
        return false;
      }
      if (key in cleanedInputs && typeof cleanedInputs[key] !== config.type) {
        return false;
      }
    }
    return true;
  }

  validateOutputs(outputs: Record<string, unknown>): boolean {
    for (const [key, config] of Object.entries(this.outputConfigs)) {
      if (!(key in outputs)) {
        return false;
      }
      if (typeof outputs[key] !== config.type) {
        return false;
      }
    }
    return true;
  }

  async safeExecute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    logger.debug("safeExecute", { inputs, inputConfigs: this.inputConfigs });
    if (!this.validateInputs(inputs)) {
      throw new Error(`Invalid inputs for block ${this.id}`);
    }

    const outputs = await this.execute(inputs);

    if (!this.validateOutputs(outputs)) {
      throw new Error(`Invalid outputs for block ${this.id}`);
    }

    this.outputs = outputs;
    return outputs;
  }

  toJSON(): { metadata: IBlockConfig; outputs: Record<string, unknown> } {
    return {
      metadata: this.getConfig(),
      outputs: this.outputs,
    };
  }

  getConfig(): IBlockConfig {
    return {
      id: this.id,
      type: this.type,
      inputConfigs: this.inputConfigs,
      outputConfigs: this.outputConfigs,
      inputs: this.inputs,
      retry: this.retry,
      timeout: this.timeout,
    };
  }

  handleError(error: Error): void {
    if (this.onError) {
      this.onError(error, this.getConfig());
    }
  }

  protected getInput(key: string): unknown {
    if (!(key in this.inputs)) {
      throw new Error(`Invalid input key: ${key}`);
    }
    return this.inputs[key];
  }
}
