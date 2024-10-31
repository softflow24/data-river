import React from "react";
import ConditionsSummary, { ConditionsSummaryProps } from "./ConditionsSummary";
import LogicSourceHandle from "../../LogicSourceHandle";
import useReactFlowState from "@/hooks/useReactFlowState";

const LogicHandleContainer: React.FC<{
  nodeId: string;
  type: "if" | "else";
  isSelected: boolean;
  connectionInProgress: boolean;
}> = ({ nodeId, type, isSelected, connectionInProgress }) => {
  return (
    <div className="relative flex items-center h-6">
      <div className="flex items-center justify-between w-full">
        <span className="text-bold">{type === "if" ? "IF" : "ELSE"}</span>
      </div>
      <LogicSourceHandle
        isVisible={isSelected}
        nodeId={nodeId}
        type={type}
        connectionInProgress={connectionInProgress}
      />
    </div>
  );
};
export const LogicBlock = ({
  config,
  nodeId,
  isSelected,
}: {
  config: ConditionsSummaryProps;
  nodeId: string;
  isSelected: boolean;
}) => {
  const { connectingHandle } = useReactFlowState((x) => ({
    connectingHandle: x.connectingHandle,
  }));

  const connectionInProgress = !!connectingHandle;

  return (
    <div className="flex flex-col gap-2 items-end">
      <LogicHandleContainer
        nodeId={nodeId}
        type="if"
        isSelected={isSelected}
        connectionInProgress={connectionInProgress}
      />
      <ConditionsSummary {...config} />
      <LogicHandleContainer
        nodeId={nodeId}
        type="else"
        isSelected={isSelected}
        connectionInProgress={connectionInProgress}
      />
    </div>
  );
};
