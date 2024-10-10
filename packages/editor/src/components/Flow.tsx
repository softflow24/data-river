import React, { useCallback } from "react";
import ReactFlow, {
  ConnectionMode,
  Background,
  Panel,
  NodeTypes,
  EdgeTypes,
  Edge,
  Connection,
  addEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { useReactFlowHooks } from "@hooks/useReactFlowHooks";
import { useReactFlowEventHandlers } from "@hooks/useReactFlowEventHandlers";

import CustomNode from "./CustomNode";
import CustomNodeInfo from "./CustomNodeInfo";
import CustomEdge from "./CustomEdge";
import Controls from "./controls";
import EditNodeSheet from "./EditNodeSheet";
import { addNewNode } from "@/slices/reactFlowSlice";
import { useDispatch } from "react-redux";
import _ from "lodash";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const FlowChart: React.FC = () => {
  const dispatch = useDispatch();
  const { lightTheme, nodes, edges } = useReactFlowState();
  const { screenToFlowPosition } = useReactFlow();
  const eventHandlers = useReactFlowEventHandlers();
  useReactFlowHooks();

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      // const reactFlowBounds = (
      //   event.currentTarget as HTMLElement
      // ).getBoundingClientRect();
      // const type = event.dataTransfer?.getData("application/reactflow");

      // const position = project({
      //   x: event.clientX - reactFlowBounds.left,
      //   y: event.clientY - reactFlowBounds.top,
      // });

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      console.log("ondrop yallah");
      dispatch(
        addNewNode({
          id: _.uniqueId("node-"),
          type: "custom",
          position,
          //data: { label: "Custom Node" },
        }),
      );

      // const newNode = {
      //   id: `${type}-${nodes.length + 1}`,
      //   type: "custom",
      //   position,
      //   data: { label: `${type} node` },
      // };

      // setNodes((nds) => [...nds, newNode]);
    },
    [nodes, addNewNode],
  );

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
        fitView
        onDrop={onDrop}
        onDragOver={onDragOver}
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
        onNodeDragStart={eventHandlers.onNodeDragStart}
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
        <Panel position="bottom-right">
          <CustomNodeInfo />
        </Panel>
      </ReactFlow>

      <EditNodeSheet />
    </div>
  );
};

export default FlowChart;
