import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const endNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    addable: false,
    block: "end@0.1",
    label: "End",
    color: "rgb(239 68 68)",
    icon: "Flag",
    inputsConfiguration: {
      value: {
        type: ["string", "number", "boolean", "object"],
        required: true,
      },
    },
  },
};
