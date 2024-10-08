import React from "react";
import SourceHandle from "./SourceHandle";

interface LogicSourceHandleProps {
  isVisible: boolean;
  nodeId: string;
  type: "if" | "else";
}

const LogicSourceHandle: React.FC<LogicSourceHandleProps> = ({
  isVisible,
  nodeId,
  type,
}) => {
  return (
    <SourceHandle
      isVisible={isVisible}
      style={{
        right: "-36px",
      }}
      handleId={`${nodeId}-${type}-handle`}
    />
  );
};

export default LogicSourceHandle;
