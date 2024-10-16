import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const outputNode: Partial<Node<NodeData>> = {
  type: "custom",
  data: {
    block: "output@0.1",
    label: "Output",
    color: "rgb(234 179 8)",
    sourceHandle: true,
    targetHandle: true,
    icon: "Square",
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
