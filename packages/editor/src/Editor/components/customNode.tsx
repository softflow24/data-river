import React from "react";
import { Play, GitBranch, Box, Zap, MessageSquare } from "lucide-react";
import { Handle, Position } from "reactflow";

interface NodeData {
  label: string;
}

const CustomNode = ({
  data,
  type,
  isMinimalist,
}: {
  data: NodeData;
  type?: string;
  isMinimalist: boolean;
}) => {
  const getColor = () => {
    switch (type) {
      case "start":
        return "bg-blue-500 text-white";
      case "process":
        return "bg-purple-500 text-white";
      case "conditional":
        return "bg-yellow-500 text-white";
      case "action":
        return "bg-green-500 text-white";
      case "response":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "start":
        return <Play size={16} />;
      case "process":
        return <Box size={16} />;
      case "conditional":
        return <GitBranch size={16} />;
      case "action":
        return <Zap size={16} />;
      case "response":
        return <MessageSquare size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md ${isMinimalist ? "bg-white" : getColor()}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`w-3 h-3 ${isMinimalist ? "!bg-gray-300" : "!bg-white"}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={`w-3 h-3 ${isMinimalist ? "!bg-gray-300" : "!bg-white"}`}
      />
      {/* Additional logic here */}
      <div className="flex items-center">
        <div className="mr-2">{getIcon()}</div>
        <div className={`font-bold ${isMinimalist ? "text-gray-800" : ""}`}>
          {data?.label || "Unnamed Node"}
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
