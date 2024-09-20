import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class OutputBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(inputs: Record<string, any>): Promise<Record<string, any>> {
    console.log("Output:", inputs);
    // Display or export results
    return {};
  }
}
