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

const FlowChart: React.FC = () => {
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
        onEdgesChange={eventHandlers.onEdgesChangeHandler}
        onConnect={eventHandlers.onConnect}
        onEdgeClick={eventHandlers.onEdgeClick}
        onEdgeMouseEnter={eventHandlers.onEdgeMouseEnter}
        onEdgeMouseLeave={eventHandlers.onEdgeMouseLeave}
        onPaneClick={eventHandlers.onPaneClick}
        onNodeMouseEnter={eventHandlers.onNodeMouseEnter}
        onNodeMouseLeave={eventHandlers.onNodeMouseLeave}
        onNodeClick={eventHandlers.onNodeClick}
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
        selectNodesOnDrag={true}
        selectionOnDrag={true}
        selectionMode={SelectionMode.Partial}
        panOnDrag={[1, 2]}
        panOnScroll
      >
        <Background
          className="cursor-default"
          color={"hsl(var(--foreground))"}
          style={{ opacity: 0.6 }}
        />
        <Controls />
        {isCustomNodeInfoVisible && (
          <Panel position="bottom-right">
            <CustomNodeInfo />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
