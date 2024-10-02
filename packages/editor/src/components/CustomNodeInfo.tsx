import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const CustomNodeInfo: React.FC = () => {
  const selectedNodeId = useSelector(
    (state: RootState) => state.app.selectedNodeId,
  );
  const hoveredNodeId = useSelector(
    (state: RootState) => state.app.hoveredNodeId,
  );
  const nodes = useSelector((state: RootState) => state.app.nodes);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) {
    return <div className="text-gray-500">No node selected</div>;
  }

  return (
    <div className="text-gray-500 bg-white p-2 rounded-md shadow-md max-w-sm">
      <h3 className="font-semibold mb-2">Selected Node Info</h3>
      <p>
        <span className="font-medium">ID:</span>{" "}
        <span className="font-bold">{selectedNode.id}</span>
      </p>
      <p>
        <span className="font-medium">Label:</span>{" "}
        <span className="font-bold">{selectedNode.data.label}</span>
      </p>
      <p>
        <span className="font-medium">Color:</span>{" "}
        <span className="font-bold">{selectedNode.data.color}</span>
      </p>
      <p>
        <span className="font-medium">Icon:</span>{" "}
        <span className="font-bold">{selectedNode.data.icon}</span>
      </p>
      <p>
        <span className="font-medium">Source Handle:</span>{" "}
        <span className="font-bold">
          {selectedNode.data.sourceHandle ? "Yes" : "No"}
        </span>
      </p>
      <p>
        <span className="font-medium">Target Handle:</span>{" "}
        <span className="font-bold">
          {selectedNode.data.targetHandle ? "Yes" : "No"}
        </span>
      </p>
      <p>
        <span className="font-medium">Is Hovered:</span>{" "}
        <span className="font-bold">
          {selectedNode.id === hoveredNodeId ? "Yes" : "No"}
        </span>
      </p>
    </div>
  );
};

export default CustomNodeInfo;
