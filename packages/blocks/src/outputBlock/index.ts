import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class OutputBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    console.log("Output:", inputs.data);
    // Display or export results
    return {};
  }
}
