import React, { useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  ConnectionMode,
  Background,
  Panel,
  NodeTypes,
  EdgeTypes,
  useReactFlow,
  NodePositionChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { useReactFlowHooks } from "@hooks/useReactFlowHooks";
import { useReactFlowEventHandlers } from "@hooks/useReactFlowEventHandlers";
import { useDispatch } from "react-redux";
import { updateNodes, finishDraggingNode } from "@/slices/reactFlowSlice";

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
  const dispatch = useDispatch();
  const { lightTheme, nodes, edges, draggingNodeId } = useReactFlowState();
  const { screenToFlowPosition } = useReactFlow();
  const eventHandlers = useReactFlowEventHandlers();
  useReactFlowHooks();

  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (draggingNodeId) {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          const flowPosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });
          const nodeChange: NodePositionChange = {
            id: draggingNodeId,
            type: "position",
            position: flowPosition,
            dragging: true,
          };
          dispatch(updateNodes([nodeChange]));
        });
      }
    },
    [draggingNodeId, screenToFlowPosition, dispatch],
  );

  const handleMouseUp = useCallback(() => {
    if (draggingNodeId) {
      dispatch(finishDraggingNode());
    }
  }, [draggingNodeId, dispatch]);

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [draggingNodeId, handleMouseMove, handleMouseUp]);

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
        onClick={() => {
          // ! Race condition making this work, the click will fire when you click on AddBlockDropdown.
          // We need to check if draggingNodeId is set, if it is, we need to finish the dragging node.
          // This here is solely for the AddBlockDropdown.
          if (!draggingNodeId) {
            return;
          }

          dispatch(finishDraggingNode());
        }}
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
