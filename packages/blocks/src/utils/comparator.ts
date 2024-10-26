import _ from "lodash";

export class Comparator {
  static looseEquals(a: unknown, b: unknown): boolean {
    return a == b;
  }

  static strictEquals(a: unknown, b: unknown): boolean {
    return a === b;
  }

  static compare(a: unknown, b: unknown): number {
    if (_.isNumber(a) && _.isNumber(b)) {
      return a - b;
    }
    if (_.isBoolean(a) && _.isBoolean(b)) {
      return a === b ? 0 : a ? 1 : -1;
    }
    if (_.isString(a) && _.isString(b)) {
      return a === b ? 0 : a > b ? 1 : -1;
    }
    return String(a) > String(b) ? 1 : -1;
  }

  static isEmpty(value: unknown): boolean {
    return _.isEmpty(value);
  }
}
