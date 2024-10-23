import React from "react";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { useLayoutState } from "@/hooks/useLayoutState";
import { updateNodesData } from "@/slices/reactFlowSlice";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";
import LogicNodePanelView from "./panelViews/LogicNodePanelView";
import { ICondition } from "@data-river/shared/interfaces/ICondition";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { toggleRightPanelVisible } from "@/store";
import RequestSetup from "./panelViews/RequestSetup";
import { RequestFormData } from "@data-river/shared/contracts/blocks/request";
import OpenAISetup from "./panelViews/Plugins/OpenAI";
const RightPanel = () => {
  const { isRightPanelVisible } = useLayoutState();
  const { nodes, selectedNodeId } = useReactFlowState((state) => ({
    nodes: state.nodes,
    selectedNodeId: state.selectedNodeId,
  }));
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
            inputs={
              (selectedNode.data.config?.inputs || {}) as Record<
                string,
                unknown
              >
            }
          />
        );

      case "request@0.1":
        return (
          <RequestSetup
            nodeId={selectedNode.id}
            config={selectedNode.data.config as unknown as RequestFormData}
            onConfigChange={handleConfigChange}
          />
        );

      case "openai@0.1":
        return (
          <OpenAISetup
            nodeId={selectedNode.id}
            config={selectedNode.data.config as any}
            onConfigChange={handleConfigChange}
          />
        );
      // Add cases for other node types here
      default:
        return <div>No settings available for this node type.</div>;
    }
  };

  return (
    <div className="bg-background h-full w-full p-4 border-l border-border overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {selectedNode.data.label} Settings
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => dispatch(toggleRightPanelVisible())}
        >
          <X />
        </Button>
      </div>
      {renderPanelView()}
    </div>
  );
};

export default RightPanel;
