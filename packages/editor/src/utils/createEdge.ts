import { Edge } from "reactflow";
import { EdgeData } from "@/types/EdgeTypes";
import { NodeData } from "@/types/NodeTypes";
import { Handle } from "@/types/HandleTypes";

export type SimpleEdgeConfig = {
  source: string;
  target: string;
  sourceProperty: string;
  targetProperty: string;
  condition?: "if" | "else";
};

export const createEdge = (
  config: SimpleEdgeConfig,
  nodes: NodeData[],
  handles: Handle[],
): Edge<EdgeData> => {
  // Find the relevant handles
  const sourceHandle = handles.find(
    (h) =>
      h.nodeId === config.source &&
      h.property === config.sourceProperty &&
      (!config.condition || h.id.includes(config.condition)) &&
      h.type === "output",
  );
  const targetHandle = handles.find(
    (h) =>
      h.nodeId === config.target &&
      h.property === config.targetProperty &&
      h.type === "input",
  );

  if (!sourceHandle || !targetHandle) {
    throw new Error(
      `Could not find handles for edge ${config.source}->${config.target}`,
    );
  }

  return {
    id: `e${config.source}-${config.target}`,
    source: config.source,
    target: config.target,
    type: "custom",
    sourceHandle: sourceHandle.id,
    targetHandle: targetHandle.id,
    data: {
      sourceProperty: config.sourceProperty,
      sourceType: sourceHandle.propertyType,
      targetProperty: config.targetProperty,
      targetType: targetHandle.propertyType,
    },
  };
};
