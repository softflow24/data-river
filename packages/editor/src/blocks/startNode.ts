import { NodeData } from "@/types/NodeTypes";
import { Node } from "reactflow";

export const startNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    addable: false,
    block: "start@0.1",
    label: "Start",
    color: "rgb(34 197 94)",
    icon: "Play",
    outputsConfiguration: {
      started: { type: "boolean", required: false },
    },
  },
};
