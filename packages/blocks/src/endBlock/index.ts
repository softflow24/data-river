import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import { Block } from "../block";

export class EndBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          value: {
            type: ["string", "number", "boolean", "object", "array"],
            required: false,
          },
        },
        outputConfigs: {
          value: {
            type: ["string", "number", "boolean", "object", "array"],
            required: false,
          },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.logger.debug("Workflow ended with input:", inputs.value);
    return { value: inputs.value };
  }
}
