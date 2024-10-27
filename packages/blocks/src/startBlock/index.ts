import { IBlockConfig } from "@data-river/shared/interfaces";

import { Block } from "../block";
import { ILogger } from "@data-river/shared/interfaces/ILogger";

export class StartBlock extends Block {
  constructor(config: IBlockConfig, logger: ILogger) {
    super(
      {
        ...config,
        inputConfigs: {
          trigger: { type: "boolean", required: false },
        },
        outputConfigs: {
          started: { type: "boolean", required: false },
        },
      },
      logger,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const trigger = inputs.trigger ?? true;

    this.logger.debug(`Workflow started with trigger: ${trigger}`);
    return { started: true };
  }
}
