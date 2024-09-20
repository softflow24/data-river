import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class EndBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    console.log("Workflow ended");
    // Perform any cleanup if needed
    return {};
  }
}
