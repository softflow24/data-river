import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class InputBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(inputs: Record<string, any>): Promise<Record<string, any>> {
    // Simulate capturing user input
    const userInput = await getUserInput();
    return { userInput };
  }
}

async function getUserInput(): Promise<any> {
  // For POC, return a fixed value
  return "Sample User Input";
}
