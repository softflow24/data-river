export interface IExecutionError {
  blockId: string;
  error: Error;
}

export interface IResult {
  nodeType: string;
  nodeId: string;
  outputs: Record<string, unknown>;
  inputs: Record<string, unknown>;
}

export interface IExecutionResult {
  result: IResult[];
  errors: IExecutionError[];
}
