import _ from "lodash";

export class ValueResolver {
  static resolveValue(value: string, inputs: Record<string, unknown>): unknown {
    if (value.startsWith("{{") && value.endsWith("}}")) {
      const variableName = value.slice(2, -2).trim();
      return this.resolveNestedValue(variableName, inputs);
    }
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
