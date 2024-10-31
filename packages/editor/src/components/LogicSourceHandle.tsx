import React from "react";
import SourceHandle from "./SourceHandle";

interface LogicSourceHandleProps {
  isVisible: boolean;
  nodeId: string;
  type: "if" | "else";
  connectionInProgress: boolean;
}

const LogicSourceHandle: React.FC<LogicSourceHandleProps> = ({
  isVisible,
  connectionInProgress,
  nodeId,
  type,
}) => {
  return (
    <SourceHandle
      isVisible={isVisible}
      connectionInProgress={connectionInProgress}
      style={{
        right: "-36px",
      }}
      handleId={`${nodeId}-${type}-handle`}
    />
  );
};

export default LogicSourceHandle;
