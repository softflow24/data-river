export interface IConnection {
  from: string;
  to: string;
  inputKey: string;
  outputKey: string;
  sourceHandle: string | undefined;
  targetHandle: string | undefined;
}
