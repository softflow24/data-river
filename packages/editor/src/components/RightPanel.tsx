import React from "react";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { useLayoutState } from "@/hooks/useLayoutState";
import { updateNodesData } from "@/slices/reactFlowSlice";
import { useDispatch } from "react-redux";
import { GitBranch } from "lucide-react";
import LogicNodePanelView from "./panelViews/LogicNodePanelView";
import { ICondition } from "@data-river/shared/interfaces/ICondition";

const RightPanel = () => {
  const { isRightPanelVisible } = useLayoutState();
  const { nodes, selectedNodeId } = useReactFlowState();
  const dispatch = useDispatch();

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  if (!isRightPanelVisible || !selectedNode) {
    return null;
  }

  const handleConfigChange = (newConfig: any) => {
    dispatch(
      updateNodesData([
        {
          id: selectedNode.id,
          data: {
            config: newConfig,
          },
        },
      ]),
    );
  };

  const handleDeleteNode = () => {
    // Implement node deletion logic here
    console.log("Delete node:", selectedNode?.id);
  };

  const renderPanelView = () => {
    switch (selectedNode.data.block) {
      case "logic@0.1":
        return (
          <LogicNodePanelView
            nodeId={selectedNode.id}
            config={
              selectedNode.data.config as {
                logicOperator: "AND" | "OR";
                conditions: ICondition[];
              }
            }
            onConfigChange={handleConfigChange}
            inputs={selectedNode.data.inputs || {}}
            onDeleteNode={handleDeleteNode}
          />
        );
      // Add cases for other node types here
      default:
        return <div>No settings available for this node type.</div>;
    }
  };

  return (
    <div className="bg-background h-full w-full p-4 border-l border-border overflow-y-auto">
      <div className="flex items-center mb-4">
        <GitBranch className="w-5 h-5 mr-2 text-blue-500" />
        <h2 className="text-lg font-semibold">
          {selectedNode.data.label} Settings
        </h2>
      </div>
      {renderPanelView()}
    </div>
  );
};

export default RightPanel;
