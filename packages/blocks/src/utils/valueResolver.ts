import { DateHandler } from "@/logicBlock/dateHandler";
import _ from "lodash";

export class ValueResolver {
  static resolveValue(
    value: string,
    inputs: Record<string, unknown>,
    type: "string" | "number" | "boolean" | "date",
  ): unknown {
    // Check for input.{name} format
    if (value.startsWith("inputs.")) {
      const inputName = value.slice(7); // Remove "inputs." prefix
      return this.parseResolvedValue(inputs[inputName], type);
    }

    // Existing logic for {{}} syntax
    if (value.startsWith("{{") && value.endsWith("}}")) {
      const variableName = value.slice(2, -2).trim();
      return this.parseResolvedValue(
        this.resolveNestedValue(variableName, inputs),
        type,
      );
    }

    // Existing logic for JSON parsing
    const parsed = _.attempt(JSON.parse, value);
    return _.isError(parsed) ? value : this.parseResolvedValue(parsed, type);
  }

  private static resolveNestedValue(
    path: string,
    obj: Record<string, unknown>,
  ): unknown {
    return _.get(obj, path);
  }

  private static parseResolvedValue(
    value: unknown,
    type: "string" | "number" | "boolean" | "date",
  ): unknown {
    if (type === "string") {
      return String(value);
    }
    if (type === "number") {
      return Number(value);
    }
    if (type === "boolean") {
      return Boolean(value);
    }
    if (type === "date") {
      return DateHandler.parseDateIfValid(value);
    }
    return value;
  }
}
