import { IWorkflowConfig } from "./IWorkflowConfig";
import { IEnvironment } from "./IEnvironment";
import { IConnection } from "./IConnection";
import { IBlockConfig } from "./IBlockConfig";

export interface IWorkflow {
  id: string;
  blocks: IBlockConfig[];
  connections: IConnection[];
  environment: IEnvironment;
  config: IWorkflowConfig;
}
