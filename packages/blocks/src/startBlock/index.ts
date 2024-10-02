import { IBlockConfig } from "@shared/interfaces";
import logger from "@shared/utils/logger";

import { Block } from "../block";

export class StartBlock extends Block {
  constructor(config: IBlockConfig) {
    super({
      ...config,
      inputConfigs: {
        trigger: { type: "boolean", required: false },
      },
      outputConfigs: {
        started: { type: "boolean" },
      },
    });
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const trigger = inputs.trigger ?? true;

    logger.debug(`Workflow started with trigger: ${trigger}`);
    return { started: true };
  }
}
