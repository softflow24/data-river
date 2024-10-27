import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import { Block } from "../block";

export class InputBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          trigger: { type: "boolean", required: false },
          input: { type: "string", required: true },
        },
        outputConfigs: {
          value: { type: "string", required: true },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return { value: inputs.input };
  }
}
