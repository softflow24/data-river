import { ICondition } from "../interfaces/ICondition";

export type CustomEvaluatorFunction = (
  // eslint-disable-next-line no-unused-vars
  condition: ICondition,
  // eslint-disable-next-line no-unused-vars
  inputs: Record<string, unknown>,
) => boolean;
