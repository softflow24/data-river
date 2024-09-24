import React from "react";
import { useSelector } from "react-redux";
import { NodeProps } from "reactflow";

import { RootState } from "../store";

import SourceHandle from "./SourceHandle";
import TargetHandle from "./TargetHandle";
import NodeIcon from "./NodeIcon";

const CustomNode: React.FC<NodeProps> = ({ id, data }) => {
  const minimalistic = useSelector(
    (state: RootState) => state.app.minimalistic,
  );
  const selectedNodeId = useSelector(
    (state: RootState) => state.app.selectedNodeId,
  );
  const hoveredNodeId = useSelector(
    (state: RootState) => state.app.hoveredNodeId,
  );
  const isSelected = id === selectedNodeId;

  const isHovered = useSelector(
    (state: RootState) => state.app.hoveredNodeId === id,
  );

  const showHandles =
    isSelected || selectedNodeId === id || hoveredNodeId === id;

  return (
    <div
      className={`
        p-5 rounded-lg min-w-[200px] flex items-center relative text-lg
        transition-all duration-300 ease-in-out
        ${minimalistic ? "bg-white text-black" : "text-white"}
        ${
          isSelected || selectedNodeId === id
            ? "border-2 border-blue-500"
            : "border-2 border-transparent"
        }
        ${isHovered ? "shadow-lg" : ""}
      `}
      style={{ background: minimalistic ? undefined : data.color }}
    >
      {data.targetHandle && <TargetHandle isVisible={showHandles} />}
      <div className="absolute left-2.5">
        <NodeIcon
          icon={data.icon}
          color={data.color}
          minimalistic={minimalistic}
        />
      </div>
      <div className="flex-1 text-center">{data.label}</div>
      {data.sourceHandle && <SourceHandle isVisible={showHandles} />}
    </div>
  );
};

export default CustomNode;
