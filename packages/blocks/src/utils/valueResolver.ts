import _ from "lodash";

export class ValueResolver {
  static resolveValue(value: string, inputs: Record<string, unknown>): unknown {
    // Check for input.{name} format
    if (value.startsWith("inputs.")) {
      const inputName = value.slice(7); // Remove "inputs." prefix
      return inputs[inputName];
    }

    // Existing logic for {{}} syntax
    if (value.startsWith("{{") && value.endsWith("}}")) {
      const variableName = value.slice(2, -2).trim();
      return this.resolveNestedValue(variableName, inputs);
    }

    // Existing logic for JSON parsing
    const parsed = _.attempt(JSON.parse, value);
    return _.isError(parsed) ? value : parsed;
  }

  private static resolveNestedValue(
    path: string,
    obj: Record<string, unknown>,
  ): unknown {
    return _.get(obj, path);
  }
}
