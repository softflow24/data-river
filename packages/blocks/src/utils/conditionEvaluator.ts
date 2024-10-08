import { ICondition } from "@data-river/shared/interfaces";
import { ILogger } from "@data-river/shared/interfaces/ILogger";
import _ from "lodash";
import { ValueResolver } from "./valueResolver";
import { DateHandler } from "../logicBlock/dateHandler";
import { Comparator } from "./comparator";

export class ConditionEvaluator {
  constructor(private logger: ILogger) {}

  evaluateCondition(
    condition: ICondition,
    inputs: Record<string, unknown>,
  ): boolean {
    const leftValue = ValueResolver.resolveValue(condition.left, inputs);
    const rightValue = ValueResolver.resolveValue(condition.right, inputs);

    const leftDate = DateHandler.parseDateIfValid(leftValue);
    const rightDate = DateHandler.parseDateIfValid(rightValue);

    if (leftDate && rightDate) {
      return DateHandler.compareDates(leftDate, rightDate, condition.operator);
    }

    switch (condition.operator) {
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
      case "contains":
        return (
          _.isString(leftValue) &&
          String(leftValue).includes(String(rightValue))
        );
      case "not_contains":
        return (
          _.isString(leftValue) &&
          !String(leftValue).includes(String(rightValue))
        );
      case "starts_with":
        return (
          _.isString(leftValue) &&
          String(leftValue).startsWith(String(rightValue))
        );
      case "ends_with":
        return (
          _.isString(leftValue) &&
          String(leftValue).endsWith(String(rightValue))
        );
      case "is_empty":
        return Comparator.isEmpty(leftValue);
      case "is_not_empty":
        return !Comparator.isEmpty(leftValue);
      default:
        this.logger.warn(`Unknown operator: ${condition.operator}`);
        return false;
    }
  }
}
