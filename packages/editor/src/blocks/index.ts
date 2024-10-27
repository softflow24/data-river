import { startNode } from "./startNode";
import { inputNode } from "./inputNode";
import { logicNode } from "./logicNode";
import { outputNode } from "./outputNode";
import { endNode } from "./endNode";
import { requestNode } from "./requestNode";
import { openAINode } from "./plugins/OpenAI/openAINode";
import { codeNode } from "./codeNode";

export const blockConfigs = {
  start: startNode,
  input: inputNode,
  logic: logicNode,
  output: outputNode,
  end: endNode,
  request: requestNode,
  openai: openAINode,
  code: codeNode,
};

export type BlockType = keyof typeof blockConfigs;
