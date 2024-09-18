import React, { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
  ControlButton,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  Play,
  GitBranch,
  Box,
  Zap,
  MessageSquare,
  ZoomIn,
  ZoomOut,
  Undo,
  MousePointer,
  Hand,
  PlusCircle,
  LayoutGrid,
  Redo,
} from "lucide-react";

interface NodeData {
  label?: string;
  condition?: string;
}

const CustomNode = ({
  data,
  type,
  isMinimalist,
}: {
  data: NodeData;
  type?: string;
  isMinimalist: boolean;
}) => {
  const getColor = () => {
    switch (type) {
      case "start":
        return "bg-blue-500 text-white";
      case "process":
        return "bg-purple-500 text-white";
      case "conditional":
        return "bg-yellow-500 text-white";
      case "action":
        return "bg-green-500 text-white";
      case "response":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "start":
        return <Play size={16} />;
      case "process":
        return <Box size={16} />;
      case "conditional":
        return <GitBranch size={16} />;
      case "action":
        return <Zap size={16} />;
      case "response":
        return <MessageSquare size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md ${isMinimalist ? "bg-white" : getColor()}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className={`w-3 h-3 ${isMinimalist ? "!bg-gray-300" : "!bg-white"}`}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={`w-3 h-3 ${isMinimalist ? "!bg-gray-300" : "!bg-white"}`}
      />
      {type === "conditional" && (
        <Handle
          type="source"
          position={Position.Right}
          className={`w-3 h-3 ${isMinimalist ? "!bg-gray-300" : "!bg-white"}`}
          id="no"
          style={{
            top: "75%",
          }}
        />
      )}
      <div className="flex items-center">
        {isMinimalist ? (
          <div className={`mr-2 p-1 rounded-full ${getColor()}`}>
            {getIcon()}
          </div>
        ) : (
          <div className="mr-2">{getIcon()}</div>
        )}
        <div className={`font-bold ${isMinimalist ? "text-gray-800" : ""}`}>
          {data?.label || "Unnamed Node"}
        </div>
      </div>
      {type === "conditional" && data?.condition && (
        <div
          className={`mt-2 text-sm ${isMinimalist ? "bg-gray-100 text-gray-800" : "bg-yellow-600"} p-1 rounded`}
        >
          IF: {data.condition}
        </div>
      )}
      {type === "conditional" && (
        <>
          <div
            className={`absolute right-2 top-1/3 text-xs ${isMinimalist ? "text-gray-600" : ""}`}
          >
            Yes
          </div>
          <div
            className={`absolute right-2 top-3/4 text-xs ${isMinimalist ? "text-gray-600" : ""}`}
          >
            No
          </div>
        </>
      )}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  start: (props: any) => (
    <CustomNode
      {...props}
      type="start"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  process: (props: any) => (
    <CustomNode
      {...props}
      type="process"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  conditional: (props: any) => (
    <CustomNode
      {...props}
      type="conditional"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  action: (props: any) => (
    <CustomNode
      {...props}
      type="action"
      isMinimalist={props.data.isMinimalist}
    />
  ),
  response: (props: any) => (
    <CustomNode
      {...props}
      type="response"
      isMinimalist={props.data.isMinimalist}
    />
  ),
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    position: {
      x: 0,
      y: 100,
    },
    data: {
      label: "Start",
      isMinimalist: false,
    },
  },
  {
    id: "2",
    type: "process",
    position: {
      x: 200,
      y: 0,
    },
    data: {
      label: "Process",
      isMinimalist: false,
    },
  },
  {
    id: "3",
    type: "conditional",
    position: {
      x: 400,
      y: 100,
    },
    data: {
      label: "Condition",
      condition: "text contains Yes",
      isMinimalist: false,
    },
  },
  {
    id: "4",
    type: "action",
    position: {
      x: 600,
      y: 0,
    },
    data: {
      label: "Action",
      isMinimalist: false,
    },
  },
  {
    id: "5",
    type: "response",
    position: {
      x: 800,
      y: 100,
    },
    data: {
      label: "Response",
      isMinimalist: false,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "yes",
    animated: true,
  },
  {
    id: "e3-5",
    source: "3",
    target: "5",
    sourceHandle: "no",
    animated: true,
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
  },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isMinimalist, setIsMinimalist] = useState(false);
  const { zoomIn, zoomOut, getZoom } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = useCallback(() => {
    const newNode: Node = {
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
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls
          style={{
            bottom: "12px",
          }}
          className="flex flex-row bg-transparent mb-2"
          position="bottom-left"
          showFitView={false}
          showInteractive={false}
          showZoom={false}
        >
          {/* MiniMap and Zoom Controls */}
          <div className="mr-2 flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
            <MiniMap
              style={{
                position: "absolute",
                margin: 0,
                marginBottom: "60px",
              }}
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
              title="Toggle minimalist view"
            >
              <LayoutGrid size={20} />
            </ControlButton>
          </div>
        </Controls>
      </ReactFlow>
      {selectedNode && (
        <div className="absolute bottom-4 left-4 p-4 bg-white shadow-lg rounded-md">
          <h3 className="font-bold mb-2">Selected Node</h3>
          <p>ID: {selectedNode.id}</p>
          <p>Type: {selectedNode.type}</p>
          <p>Label: {selectedNode.data?.label || "Unnamed Node"}</p>
        </div>
      )}
    </div>
  );
}

export default function EnhancedNodeEditor() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}
