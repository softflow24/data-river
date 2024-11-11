import React from "react";
import ReactFlow, {
  ConnectionMode,
  Background,
  Panel,
  NodeTypes,
  EdgeTypes,
  SelectionMode,
} from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { useReactFlowHooks } from "@hooks/useReactFlowHooks";
import { useReactFlowEventHandlers } from "@hooks/useReactFlowEventHandlers";

import CustomNode from "./CustomNode";
import CustomNodeInfo from "./CustomNodeInfo";
import CustomEdge from "./CustomEdge";
import Controls from "./controls";
import useTheme from "@data-river/shared/ui/hooks/useTheme";
import useLayoutState from "@/hooks/useLayoutState";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const FlowChart: React.FC<{ readonly?: boolean }> = ({ readonly = false }) => {
  const theme = useTheme();
  const { nodes, edges } = useReactFlowState((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  const eventHandlers = useReactFlowEventHandlers();
  const { isCustomNodeInfoVisible } = useLayoutState();
  useReactFlowHooks();

  return (
    <div
      className="w-full h-full min-h-full cursor-default"
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={eventHandlers.onNodesChangeHandler}
        onEdgesChange={
          readonly ? undefined : eventHandlers.onEdgesChangeHandler
        }
        onConnect={readonly ? undefined : eventHandlers.onConnect}
        onConnectStart={readonly ? undefined : eventHandlers.onConnectStart}
        onConnectEnd={readonly ? undefined : eventHandlers.onConnectEnd}
        onEdgeClick={readonly ? undefined : eventHandlers.onEdgeClick}
        onEdgeMouseEnter={eventHandlers.onEdgeMouseEnter}
        onEdgeMouseLeave={readonly ? undefined : eventHandlers.onEdgeMouseLeave}
        onPaneClick={eventHandlers.onPaneClick}
        onNodeMouseEnter={eventHandlers.onNodeMouseEnter}
        onNodeMouseLeave={eventHandlers.onNodeMouseLeave}
        onNodeClick={eventHandlers.onNodeClick}
        onNodeDragStart={readonly ? undefined : eventHandlers.onNodeDragStart}
        onSelectionChange={
          readonly ? undefined : eventHandlers.onSelectionChange
        }
        selectionKeyCode="Meta"
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "custom",
        }}
        connectionLineStyle={{ strokeWidth: 2 }}
        edgeTypes={edgeTypes}
        minZoom={0.5}
        maxZoom={3}
        fitView
        selectNodesOnDrag={readonly ? false : true}
        selectionOnDrag={readonly ? false : true}
        selectionMode={SelectionMode.Partial}
        multiSelectionKeyCode="Shift"
        panOnDrag={[1, 2]}
        panOnScroll
      >
        <Background
          className="cursor-default"
          color={"hsl(var(--foreground))"}
          style={{ opacity: 0.6 }}
        />
        <Controls onlyMap={readonly} />
        {!readonly && isCustomNodeInfoVisible && (
          <Panel position="bottom-right">
            <CustomNodeInfo />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
