import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const outputNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    block: "output@0.1",
    label: "Output",
    color: "rgb(234 179 8)",
    sourceHandle: true,
    targetHandle: true,
    icon: "Square",
    inputsConfiguration: {
      value: {
        type: ["string", "number", "boolean", "object"],
        required: true,
      },
    },
    outputsConfiguration: {
      value: {
        type: ["string", "number", "boolean", "object"],
        required: true,
      },
    },
    controls: [
      {
        label: "",
        type: "text-area",
        name: "output",
        placeholder: "Value from input will be displayed here after execution",
      },
    ],
  },
};
