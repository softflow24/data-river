import { IBlockConfig } from "@shared/interfaces";
import logger from "@shared/utils/logger";

import { Block } from "../block";

export class OutputBlock extends Block {
  constructor(config: IBlockConfig) {
    super({
      ...config,
      inputConfigs: {
        data: { type: "string", required: true },
      },
      outputConfigs: {},
    });
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    logger.debug("Output:", inputs.data);
    return {};
  }
}
