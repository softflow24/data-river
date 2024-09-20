import { IBlockConfig } from "@shared/interfaces";

import { Block } from "../block";

export class LogicBlock extends Block {
  condition: string;

  constructor(config: IBlockConfig & { condition?: string }) {
    super(config);
    this.condition = config.condition || "";
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const conditionResult = evaluateCondition(this.condition, inputs);
    return { conditionResult };
  }
}

function evaluateCondition(
  condition: string,
  inputs: Record<string, unknown>,
): boolean {
  // Implement condition evaluation logic
  // For POC, randomly return true or false
  return Math.random() >= 0.5;
}
