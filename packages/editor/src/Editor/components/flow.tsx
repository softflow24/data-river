import { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  useReactFlow,
  Controls,
  ControlButton,
  Background,
  MiniMap,
} from "reactflow";
import {
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  PlusCircle,
  MousePointer,
  Hand,
  LayoutGrid,
} from "lucide-react";

import { initialNodes } from "./initialNodes";
import { initialEdges } from "./initialEdges";
import { nodeTypes } from "./nodeTypes";
import "reactflow/dist/style.css";

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

        {/* Controls */}
        <Controls
          style={{ bottom: "12px" }}
          className="flex flex-row bg-transparent mb-2"
          position="bottom-left"
          showFitView={false}
          showInteractive={false}
          showZoom={false}
        >
          {/* MiniMap and Zoom Controls */}
          <div className="mr-2 flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
            <MiniMap
              style={{ position: "absolute", margin: 0, marginBottom: "60px" }}
              position="bottom-left"
              pannable
              zoomable
            />
            <div className="mt-2 flex items-center justify-between w-auto">
              <ControlButton
                className="text-gray-600 hover:text-gray-800"
                onClick={() => zoomOut()}
              >
                <ZoomOut size={20} />
              </ControlButton>
              <span className="mx-2 text-sm font-medium text-gray-500">
                {Math.round(getZoom() * 100)}%
              </span>
              <ControlButton
                className="text-gray-600 hover:text-gray-800"
                onClick={() => zoomIn()}
              >
                <ZoomIn size={20} />
              </ControlButton>
            </div>
          </div>

          {/* Undo/Redo Controls */}
          <div className="mr-2 flex items-center bg-white p-2 rounded-lg shadow-md">
            <ControlButton
              className="text-gray-600 hover:text-gray-800"
              onClick={() => console.log("undo")}
            >
              <Undo size={20} />
            </ControlButton>
            <ControlButton
              className="text-gray-600 hover:text-gray-800"
              onClick={() => console.log("redo")}
            >
              <Redo size={20} />
            </ControlButton>
          </div>

          {/* Action Tools (Add Node, Hand Tool) */}
          <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
            <ControlButton
              className="text-gray-600 hover:text-gray-800"
              onClick={() => addNewNode()}
            >
              <PlusCircle size={20} />
            </ControlButton>
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <ControlButton className="text-gray-600 hover:text-gray-800">
              <MousePointer size={20} />
            </ControlButton>
            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-2"></div>
            <ControlButton className="text-blue-500 bg-blue-100 p-1 rounded-md">
              <Hand size={20} />
            </ControlButton>
            <ControlButton
              onClick={toggleMinimalist}
              className="text-gray-600 hover:text-gray-800"
            >
              <LayoutGrid size={20} />
            </ControlButton>
          </div>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default Flow;
