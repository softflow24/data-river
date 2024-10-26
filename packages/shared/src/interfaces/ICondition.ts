import { ComparisonOperator } from "../types/ComparisonOperator";

export interface ICondition {
  left: string; // variable name or literal value
  operator: ComparisonOperator; // Comparison operator or custom operator
  right: string; // variable name or literal value
  type: "number" | "string" | "boolean" | "date"; // type of condition
}
