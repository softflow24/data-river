import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const inputNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    block: "input@0.1",
    label: "Input",
    color: "rgb(234 179 8)",
    sourceHandle: true,
    targetHandle: true,
    icon: "TextCursorInput",
    config: {
      input: "",
    },
    inputsConfiguration: {
      trigger: {
        type: "boolean",
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
        type: "text",
        label: "Value",
        name: "input",
        placeholder: "Pass to output",
      },
    ],
  },
};
