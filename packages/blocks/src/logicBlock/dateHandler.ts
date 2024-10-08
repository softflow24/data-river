import _ from "lodash";

export class DateHandler {
  static parseDateIfValid(value: unknown): Date | null {
    if (_.isDate(value)) {
      return value;
    }
    if (_.isString(value) || _.isNumber(value)) {
      const timestamp = _.toNumber(new Date(value));
      return isNaN(timestamp) ? null : new Date(timestamp);
    }
    return null;
  }

  static compareDates(a: Date, b: Date, operator: string): boolean {
    const aTime = a.getTime();
    const bTime = b.getTime();
    switch (operator) {
      case ">":
        return aTime > bTime;
      case ">=":
        return aTime >= bTime;
      case "<":
        return aTime < bTime;
      case "<=":
        return aTime <= bTime;
      case "==":
        return aTime === bTime;
      case "!=":
        return aTime !== bTime;
      default:
        return false;
    }
  }
}
