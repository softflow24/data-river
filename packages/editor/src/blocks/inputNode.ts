import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const inputNode: Partial<Node<NodeData>> = {
  type: "custom",
  data: {
    block: "input@0.1",
    label: "Input",
    color: "rgb(234 179 8)",
    sourceHandle: true,
    targetHandle: true,
    icon: "TextCursorInput",
    inputs: {},
    config: {
      input: "",
    },
    outputs: {
      output: "",
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
