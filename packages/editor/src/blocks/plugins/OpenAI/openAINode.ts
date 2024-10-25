import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const openAINode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    block: "openai@0.1",
    label: "OpenAI",
    color: "rgb(16 185 129)", // A teal color
    sourceHandle: true,
    targetHandle: true,
    icon: "Brain",
    outputs: {
      response: "",
    },
    config: {
      apiKey: "",
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 150,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      stop: [],
    },
    controls: [
      {
        type: "text-readonly",
        label: "Model",
        name: "model",
      },
    ],
  },
};
