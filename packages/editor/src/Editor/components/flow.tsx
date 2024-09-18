import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  useReactFlow,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import { initialNodes } from "./initialNodes";
import { initialEdges } from "./initialEdges";
import { nodeTypes } from "./nodeTypes";
import Controls from "./controls";

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isMinimalist, setIsMinimalist] = useState(false);
  const { zoomIn, zoomOut, getZoom } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNewNode = useCallback(() => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "process",
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${nodes.length + 1}`,
        isMinimalist,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes, isMinimalist]);

  const toggleMinimalist = useCallback(() => {
    setIsMinimalist((prev) => !prev);
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isMinimalist: !isMinimalist,
        },
      })),
    );
  }, [isMinimalist, setNodes]);

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls
          zoomOut={zoomOut}
          zoomIn={zoomIn}
          getZoom={getZoom}
          addNewNode={addNewNode}
          toggleMinimalist={toggleMinimalist}
        />
      </ReactFlow>
    </div>
  );
};

export default Flow;
