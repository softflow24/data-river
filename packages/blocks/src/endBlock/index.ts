import { IBlockConfig } from "@shared/interfaces";
import logger from "@shared/utils/logger";

import { Block } from "../block";

export class EndBlock extends Block {
  constructor(config: IBlockConfig) {
    super({
      ...config,
      inputConfigs: {
        data: { type: "string", required: false },
      },
      outputConfigs: {},
    });
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    logger.debug("Workflow ended with input:", inputs.data);
    return {};
  }
}
