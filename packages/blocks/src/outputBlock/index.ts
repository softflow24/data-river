import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import { Block } from "../block";

export class OutputBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          value: {
            type: ["string", "number", "boolean", "object", "array"],
            required: true,
          },
        },
        outputConfigs: {
          value: {
            type: ["string", "number", "boolean", "object", "array"],
            required: true,
          },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.logger.info("Output:", inputs.value);
    return { value: inputs.value };
  }
}
