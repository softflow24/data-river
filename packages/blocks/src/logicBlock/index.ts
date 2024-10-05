import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import { Block } from "../block";

export class LogicBlock extends Block {
  condition: string;

  constructor(config: IBlockConfig & { condition?: string }, logger: ILogger) {
    super(config, logger);
    this.condition = config.condition || "";
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const conditionResult = evaluateCondition(this.condition, inputs);
    this.logger.debug(`Condition result: ${conditionResult}`);
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
