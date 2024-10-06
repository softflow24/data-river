import React from "react";
import ReactFlow, {
  ConnectionMode,
  Background,
  Panel,
  NodeTypes,
  EdgeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { Minimize2, Maximize2, Sun, Moon } from "lucide-react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@store";
import { toggleMinimalistic, toggleLightTheme } from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { useReactFlowHooks } from "@hooks/useReactFlowHooks";
import { useReactFlowEventHandlers } from "@hooks/useReactFlowEventHandlers";

import CustomNode from "./CustomNode";
import CustomNodeInfo from "./CustomNodeInfo";
import CustomEdge from "./CustomEdge";
import Controls from "./controls";
import EditNodeSheet from "./EditNodeSheet";

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

  return (
    <div
      className="w-full h-full min-h-full"
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
        onNodeDragStart={eventHandlers.onNodeDragStart} // Updated this line
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          type: "custom",
        }}
        connectionLineStyle={{ strokeWidth: 2 }}
        edgeTypes={edgeTypes}
        minZoom={0.5}
        maxZoom={3}
      >
        <Background color={"hsl(var(--foreground))"} style={{ opacity: 0.6 }} />
        <Controls />
        {/* <Panel position="top-right">
          <button
            onClick={() => dispatch(toggleMinimalistic())}
            style={{ marginRight: "10px" }}
          >
            {minimalistic ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </button>
          <button onClick={() => dispatch(toggleLightTheme())}>
            {lightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </Panel> */}
        <Panel position="bottom-right">
          <CustomNodeInfo />
        </Panel>
        {/* <Panel position="top-right">
          <TopRightControls />
        </Panel> */}
      </ReactFlow>

      <EditNodeSheet />
    </div>
  );
};

export default FlowChart;
