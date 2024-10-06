import React, { useState } from "react";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { ChevronDown, ChevronUp } from "lucide-react";

const CustomNodeInfo: React.FC = () => {
  const { selectedNodeId, hoveredNodeId, nodes } = useReactFlowState();
  const [isInputsExpanded, setIsInputsExpanded] = useState(false);
  const [isOutputsExpanded, setIsOutputsExpanded] = useState(false);

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!selectedNode) {
    return <div className="text-gray-500">No node selected</div>;
  }

  const renderLogData = (data: unknown): string => {
    if (typeof data === "object" && data !== null) {
      return JSON.stringify(data, null, 2);
    }
    return String(data ?? "{}");
  };

  return (
    <div className="bg-background p-2 rounded-md shadow-md max-w-sm">
      <h3 className="font-semibold mb-2">Selected Node Info</h3>
      <p>
        <span className="font-medium mr-1">ID:</span>
        <span className="font-bold">{selectedNode.id}</span>
      </p>
      <p>
        <span className="font-medium mr-1">Label:</span>
        <span className="font-bold">{selectedNode.data.label}</span>
      </p>
      <p>
        <span className="font-medium mr-1">Color:</span>
        <span className="font-bold">{selectedNode.data.color}</span>
      </p>
      <p>
        <span className="font-medium mr-1">Icon:</span>
        <span className="font-bold">{selectedNode.data.icon}</span>
      </p>
      <p>
        <span className="font-medium mr-1">Source Handle:</span>
        <span className="font-bold">
          {selectedNode.data.sourceHandle ? "Yes" : "No"}
        </span>
      </p>
      <p>
        <span className="font-medium mr-1">Target Handle:</span>
        <span className="font-bold">
          {selectedNode.data.targetHandle ? "Yes" : "No"}
        </span>
      </p>
      <p>
        <span className="font-medium mr-1">Is Hovered:</span>
        <span className="font-bold">
          {selectedNode.id === hoveredNodeId ? "Yes" : "No"}
        </span>
      </p>
      <div>
        <button
          onClick={() => setIsInputsExpanded(!isInputsExpanded)}
          className="flex items-center font-medium focus:outline-none"
        >
          <span>Inputs:</span>
          {isInputsExpanded ? (
            <ChevronUp className="ml-1 w-4 h-4" />
          ) : (
            <ChevronDown className="ml-1 w-4 h-4" />
          )}
        </button>
        {isInputsExpanded && (
          <pre className="bg-black-950 text-white p-2 rounded-md text-xs whitespace-pre-wrap border w-full mt-1">
            {renderLogData(selectedNode.data.inputs)}
          </pre>
        )}
      </div>
      <div className="mt-2">
        <button
          onClick={() => setIsOutputsExpanded(!isOutputsExpanded)}
          className="flex items-center font-medium focus:outline-none"
        >
          <span>Outputs:</span>
          {isOutputsExpanded ? (
            <ChevronUp className="ml-1 w-4 h-4" />
          ) : (
            <ChevronDown className="ml-1 w-4 h-4" />
          )}
        </button>
        {isOutputsExpanded && (
          <pre className="bg-black-950 text-white p-2 rounded-md text-xs whitespace-pre-wrap border w-full mt-1">
            {renderLogData(selectedNode.data.outputs)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CustomNodeInfo;
