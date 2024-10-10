import { NodeData } from "@/types/NodeTypes";
import { Node } from "reactflow";

export const startNode: Partial<Node<NodeData>> = {
  type: "custom",
  data: {
    block: "start@0.1",
    label: "Start",
    color: "rgb(34 197 94)",
    sourceHandle: true,
    targetHandle: false,
    icon: "Play",
  },
};
