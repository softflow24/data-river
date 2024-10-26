import { ICondition } from "@data-river/shared/interfaces/ICondition";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import _ from "lodash";
import { ValueResolver } from "@/utils/valueResolver";
import { DateHandler } from "./dateHandler";
import { Comparator } from "@/utils/comparator";

export class ConditionEvaluator {
  constructor(private logger: ILogger) {}

  evaluateCondition(
    condition: ICondition,
    inputs: Record<string, unknown>,
  ): boolean {
    const leftValue = ValueResolver.resolveValue(condition.left, inputs);
    const rightValue = ValueResolver.resolveValue(condition.right, inputs);

    switch (condition.type) {
      case "date":
        const leftDate = DateHandler.parseDateIfValid(leftValue);
        const rightDate = DateHandler.parseDateIfValid(rightValue);
        if (leftDate && rightDate) {
          return DateHandler.compareDates(leftDate, rightDate, condition.operator);
        }
        break;
      case "number":
        return this.evaluateNumberCondition(leftValue, rightValue, condition.operator);
      case "boolean":
        return this.evaluateBooleanCondition(leftValue, rightValue, condition.operator);
      case "string":
        return this.evaluateStringCondition(leftValue, rightValue, condition.operator);
      default:
        throw new Error("Invalid condition type.")
    }
    return false;
  }

  private evaluateNumberCondition(leftValue: unknown, rightValue: unknown, operator: string): boolean {
    switch (operator) {
      case "==":
        return Comparator.looseEquals(leftValue, rightValue);
      case "===":
        return Comparator.strictEquals(leftValue, rightValue);
      case "!=":
        return !Comparator.looseEquals(leftValue, rightValue);
      case "!==":
        return !Comparator.strictEquals(leftValue, rightValue);
      case ">":
        return Comparator.compare(leftValue, rightValue) > 0;
      case ">=":
        return Comparator.compare(leftValue, rightValue) >= 0;
      case "<":
        return Comparator.compare(leftValue, rightValue) < 0;
      case "<=":
        return Comparator.compare(leftValue, rightValue) <= 0;
      default:
        this.logger.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }

  private evaluateBooleanCondition(leftValue: unknown, rightValue: unknown, operator: string): boolean {
    switch (operator) {
      case "==":
        return Comparator.looseEquals(leftValue, rightValue);
      case "===":
        return Comparator.strictEquals(leftValue, rightValue);
      case "!=":
        return !Comparator.looseEquals(leftValue, rightValue);
      case "!==":
        return !Comparator.strictEquals(leftValue, rightValue);
      default:
        this.logger.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }

  private evaluateStringCondition(leftValue: unknown, rightValue: unknown, operator: string): boolean {
    switch (operator) {
      case "==":
        return Comparator.looseEquals(leftValue, rightValue);
      case "===":
        return Comparator.strictEquals(leftValue, rightValue);
      case "!=":
        return !Comparator.looseEquals(leftValue, rightValue);
      case "!==":
        return !Comparator.strictEquals(leftValue, rightValue);
      case "contains":
        return _.isString(leftValue) && String(leftValue).includes(String(rightValue));
      case "not_contains":
        return _.isString(leftValue) && !String(leftValue).includes(String(rightValue));
      case "starts_with":
        return _.isString(leftValue) && String(leftValue).startsWith(String(rightValue));
      case "ends_with":
        return _.isString(leftValue) && String(leftValue).endsWith(String(rightValue));
      case "is_empty":
        return Comparator.isEmpty(leftValue);
      case "is_not_empty":
        return !Comparator.isEmpty(leftValue);
      default:
        this.logger.warn(`Unknown operator: ${operator}`);
        return false;
    }
  }
}
