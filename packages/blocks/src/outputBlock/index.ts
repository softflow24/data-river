import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import { Block } from "../block";

export class OutputBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          data: { type: "string", required: true },
        },
        outputConfigs: {},
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.logger.info("Output:", inputs.data);
    return { data: inputs.data };
  }
}
