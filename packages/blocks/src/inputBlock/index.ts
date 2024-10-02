import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class InputBlock extends Block {
  constructor(config: IBlockConfig) {
    super({
      ...config,
      inputConfigs: {
        trigger: { type: "boolean", required: false },
        input: { type: "string", required: true },
      },
      outputConfigs: {
        data: { type: "string" },
      },
    });
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return { data: inputs.input };
  }
}
