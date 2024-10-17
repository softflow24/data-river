import { IBlock, IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import BlockValidationError from "../errors/blockValidationError";

export abstract class Block implements IBlock {
  readonly id: string;
  readonly type: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  private inputConfigs: Record<
    string,
    { type: string | string[]; required: boolean }
  >;
  private outputConfigs: Record<string, { type: string }>;
  readonly retry: number;
  readonly timeout: number;
  readonly onError: (error: Error, blockConfig: IBlockConfig) => void;
  protected logger: ILogger;

  constructor(config: IBlockConfig, logger: ILogger) {
    this.id = config.id;
    this.type = config.type;
    this.inputConfigs = config.inputConfigs ?? {};
    this.outputConfigs = config.outputConfigs ?? {};
    this.inputs = config.inputs ?? {};
    this.outputs = {};
    this.retry = config.retry || 0;
    this.timeout = config.timeout || 0;
    this.onError = config.onError || (() => {});
    this.logger = logger;
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

  validateInputs(inputs: Record<string, unknown>): {
    valid: boolean;
    missingFields: string[];
    invalidFields: string[];
  } {
    const cleanedInputs: Record<string, unknown> = {};
    const missingFields: string[] = [];
    const invalidFields: string[] = [];

    for (const [key, config] of Object.entries(this.inputConfigs)) {
      if (
        config.required &&
        (!(key in inputs) ||
          inputs[key] === undefined ||
          inputs[key] === null ||
          inputs[key] === "")
      ) {
        missingFields.push(key);
      } else if (
        key in inputs &&
        inputs[key] !== undefined &&
        inputs[key] !== null &&
        inputs[key] !== ""
      ) {
        if (
          Array.isArray(config.type) &&
          !config.type.includes(typeof inputs[key])
        ) {
          invalidFields.push(key);
        } else if (
          !Array.isArray(config.type) &&
          typeof inputs[key] !== config.type
        ) {
          invalidFields.push(key);
        } else {
          cleanedInputs[key] = inputs[key];
        }
      }
    }

    return {
      valid: missingFields.length === 0 && invalidFields.length === 0,
      missingFields,
      invalidFields,
    };
  }

  validateOutputs(outputs: Record<string, unknown>): {
    valid: boolean;
    missingFields: string[];
    invalidFields: string[];
  } {
    const missingFields: string[] = [];
    const invalidFields: string[] = [];

    for (const [key, config] of Object.entries(this.outputConfigs)) {
      if (!(key in outputs)) {
        missingFields.push(key);
      } else if (typeof outputs[key] !== config.type) {
        invalidFields.push(key);
      }
    }

    return {
      valid: missingFields.length === 0 && invalidFields.length === 0,
      missingFields,
      invalidFields,
    };
  }

  async safeExecute(
    inputs: Record<string, unknown>,
    config: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.logger.group(`Block Id:${this.id} Type:${this.type}`);

    // Merge inputs with config
    const mergedInputs = { ...config, ...inputs };

    this.logger.debug("safeExecute", {
      mergedInputs,
      inputConfigs: this.inputConfigs,
    });

    const inputValidation = this.validateInputs(mergedInputs);
    if (!inputValidation.valid) {
      throw new BlockValidationError(
        `Invalid inputs for block ${this.id}`,
        inputValidation.missingFields,
        inputValidation.invalidFields,
        "input",
      );
    }

    const outputs = await this.execute(mergedInputs);

    const outputValidation = this.validateOutputs(outputs);
    if (!outputValidation.valid) {
      throw new BlockValidationError(
        `Invalid outputs for block ${this.id}`,
        outputValidation.missingFields,
        outputValidation.invalidFields,
        "output",
      );
    }

    this.outputs = outputs;
    this.logger.groupEnd();
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
