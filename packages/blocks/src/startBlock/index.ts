import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class StartBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(inputs: Record<string, any>): Promise<Record<string, any>> {
    console.log("Workflow started");
    // Initialize workflow state if needed
    return {};
  }
}
