import { NodeData } from "@/types/NodeTypes";
import { Node } from "@reactflow/core";

export interface NodeDataChange {
  id: string;
  data: Partial<NodeData>;
}

export function applyDataChanges(changes: NodeDataChange[], nodes: Node[]) {
  // Create a map of changes for quick lookup by node id
  const changesMap = new Map(changes.map((change) => [change.id, change.data]));

  return nodes.map((node) => {
    if (!changesMap.has(node.id)) {
      // If there's no change for this node, return it as-is
      return node;
    }

    // Apply the change to the node's data
    return {
      ...node,
      data: {
        ...node.data,
        ...changesMap.get(node.id), // Get the new data from the changes map
      },
    };
  });
}
