import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const codeNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    block: "code@0.1",
    label: "Code",
    color: "rgb(0 122 255)",
    icon: "Code",
    config: {
      code: "",
    },
    inputsConfiguration: {
      input: {
        type: ["string", "number", "boolean", "object"],
        required: true,
      },
    },
    outputsConfiguration: {
      result: {
        type: ["string", "number", "boolean", "object"],
        required: true,
      },
    },
    controls: [
      {
        type: "text-readonly",
        label: "Code",
        name: "code",
      },
    ],
  },
};
