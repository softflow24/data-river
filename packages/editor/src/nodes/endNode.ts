import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const endNode: Partial<Node<NodeData>> = {
  type: "custom",
  data: {
    block: "end@0.1",
    label: "End",
    color: "rgb(239 68 68)",
    sourceHandle: false,
    targetHandle: true,
    icon: "Flag",
  },
};
