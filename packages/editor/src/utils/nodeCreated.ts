import { type Handle } from "@/types/HandleTypes";
import { NodeData } from "@/types/NodeTypes";
import { Node } from "reactflow";

export const createHandles = (blockConfig: Node<NodeData>) => {
  const handles: Handle[] = [];

  if (blockConfig.data.block.includes("logic@")) {
    handles.push({
      id: `${blockConfig.id}-if-handle`,
      nodeId: blockConfig.id,
      label: "If",
      property: "result",
      type: "output",
      propertyType: "string",
    });

    handles.push({
      id: `${blockConfig.id}-else-handle`,
      nodeId: blockConfig.id,
      label: "Else",
      property: "result",
      type: "output",
      propertyType: "string",
    });
  } else if (blockConfig.data.outputsConfiguration) {
    Object.entries(blockConfig.data.outputsConfiguration).forEach(
      ([property, type]) => {
        handles.push({
          id: `${blockConfig.id}-output-${property}`,
          nodeId: blockConfig.id,
          label: property,
          property,
          type: "output",
          propertyType: type.type,
        });
      },
    );
  }

  if (blockConfig.data.inputsConfiguration) {
    Object.entries(blockConfig.data.inputsConfiguration).forEach(
      ([property, type]) => {
        handles.push({
          id: `${blockConfig.id}-input-${property}`,
          nodeId: blockConfig.id,
          label: property,
          property,
          type: "input",
          propertyType: type.type,
        });
      },
    );
  }

  return handles;
};
