import React, { useEffect } from "react";
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
import useEditorState from "@/hooks/useEditorState";

import CustomNode from "./CustomNode";
import CustomNodeInfo from "./CustomNodeInfo";
import CustomEdge from "./CustomEdge";
import Controls from "./controls";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const FlowChart: React.FC = () => {
  const { lightTheme, nodes, edges } = useReactFlowState();
  const eventHandlers = useReactFlowEventHandlers();
  useReactFlowHooks();
  const isPanning = useEditorState((state) => state.isPanning);

  return (
    <div
      className="w-full h-full min-h-full cursor-default"
      style={{
        backgroundColor: lightTheme
          ? "#f0f0f0"
          : "rgb(3 7 18 / var(--tw-bg-opacity))",
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
        <Panel position="bottom-right">
          <CustomNodeInfo />
        </Panel>
      </ReactFlow>
      <span className="absolute top-20 left-20">
        {isPanning ? "true" : "false"}
      </span>
    </div>
  );
};

export default FlowChart;
