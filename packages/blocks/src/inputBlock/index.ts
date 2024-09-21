import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class InputBlock extends Block {
  constructor(config: IBlockConfig) {
    super(config);
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    // Simulate capturing user input
    const userInput = await getUserInput();
    return { data: userInput };
  }
}

async function getUserInput(): Promise<unknown> {
  // For POC, return a fixed value
  const value = "Sample User Input with an env variable {{apiKey}}";
  console.log("Received inputs:", value);
  return value;
}
