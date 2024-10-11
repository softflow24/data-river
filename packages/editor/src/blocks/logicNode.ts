import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const logicNode: Partial<Node<NodeData>> = {
  type: "custom",
  data: {
    block: "logic@0.1",
    label: "Logic",
    color: "rgb(59 130 246)",
    sourceHandle: false,
    targetHandle: true,
    icon: "GitBranch",
    inputs: { value: "" },
    outputs: {
      result: "",
    },
    config: {
      logicOperator: "AND",
      conditions: [],
    },
    controls: [
      {
        type: "conditions-summary",
        label: "Conditions summary",
        name: "conditions",
      },
    ],
  },
};
