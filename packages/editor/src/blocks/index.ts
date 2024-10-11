import { startNode } from "./startNode";
import { inputNode } from "./inputNode";
import { logicNode } from "./logicNode";
import { outputNode } from "./outputNode";
import { endNode } from "./endNode";

export const blockConfigs = {
  start: startNode,
  input: inputNode,
  logic: logicNode,
  output: outputNode,
  end: endNode,
};

export type BlockType = keyof typeof blockConfigs;
