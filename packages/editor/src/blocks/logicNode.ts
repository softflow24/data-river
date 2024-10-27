import { Node } from "reactflow";
import { NodeData } from "@/types/NodeTypes";

export const logicNode: Omit<Node<NodeData>, "id" | "position"> = {
  type: "custom",
  data: {
    block: "logic@0.1",
    label: "Logic",
    color: "rgb(59 130 246)",
    sourceHandle: false,
    targetHandle: true,
    icon: "GitBranch",
    config: {
      logicOperator: "AND",
      conditions: [],
    },
    inputsConfiguration: {
      value: { type: "string", required: true },
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
