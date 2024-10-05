import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

import { Block } from "../block";

export class EndBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          data: { type: "string", required: false },
        },
        outputConfigs: {},
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    this.logger.debug("Workflow ended with input:", inputs.data);
    return {};
  }
}
