import { IBlockConfig } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import { Block } from "@/block";
import { CustomEvaluatorStrategy } from "@/utils/customEvaluatorStrategy";
import { CustomEvaluatorFunction } from "@data-river/shared/types";
import { ICondition } from "@data-river/shared/interfaces";
import { ConditionEvaluator } from "./conditionEvaluator";

export interface LogicBlockConfig {
  conditions: ICondition[];
  logicOperator: "AND" | "OR";
  customEvaluatorCode?: string;
}

export class LogicBlock extends Block {
  conditions: ICondition[];
  logicOperator: "AND" | "OR";
  customEvaluator?: CustomEvaluatorFunction;
  private conditionEvaluator: ConditionEvaluator;

  constructor(config: IBlockConfig, logger: ILogger) {
    super(config, logger);
    const magicConfig = config.config as unknown as LogicBlockConfig;
    this.conditions = magicConfig.conditions || [];
    this.logicOperator = magicConfig.logicOperator || "AND";
    this.conditionEvaluator = new ConditionEvaluator(logger);
    if (magicConfig.customEvaluatorCode) {
      this.setCustomEvaluator(magicConfig.customEvaluatorCode);
    }
  }

  setCustomEvaluator(code: string, timeout?: number) {
    this.customEvaluator = CustomEvaluatorStrategy.createEvaluator(
      code,
      timeout,
    );
  }

  async execute(
    inputs: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const conditionResults = this.conditions.map((condition) =>
      this.evaluateCondition(condition, inputs),
    );

    const result =
      this.logicOperator === "AND"
        ? conditionResults.every((result) => result)
        : conditionResults.some((result) => result);

    this.logger.debug(`Condition result: ${result}`);
    return { result };
  }

  private evaluateCondition(
    condition: ICondition,
    inputs: Record<string, unknown>,
  ): boolean {
    return this.customEvaluator
      ? this.customEvaluator(condition, inputs)
      : this.conditionEvaluator.evaluateCondition(condition, inputs);
  }
}
