import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  ConnectionMode,
  Background,
  Panel,
  NodeMouseHandler,
  EdgeMouseHandler,
  EdgeChange,
  NodeTypes,
  NodeChange,
  EdgeTypes,
  addEdge,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
  useReactFlow,
  useOnViewportChange,
  Viewport,
} from "reactflow";
import "reactflow/dist/style.css";
import { Minimize2, Maximize2, Sun, Moon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";

import {
  toggleMinimalistic,
  toggleLightTheme,
  setSelectedNodeId,
  setHoveredNodeId,
  updateNodes,
  updateEdges,
  setSelectedEdgeId,
  setHoveredEdgeId,
  setEdges,
  setViewport as setViewportAction,
} from "../store";
import { RootState, AppDispatch } from "../store";

import CustomNode from "./CustomNode";
import CustomNodeInfo from "./CustomNodeInfo";
import CustomEdge from "./CustomEdge";
import Controls from "./controls";

// Import shadcn components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

interface NodeData {
  label: string;
  description: string;
}

const FlowChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setCenter } = useReactFlow();

  const minimalistic = useSelector(
    (state: RootState) => state.app.minimalistic,
  );
  const lightTheme = useSelector((state: RootState) => state.app.lightTheme);
  const selectedNodeId = useSelector(
    (state: RootState) => state.app.selectedNodeId,
  );
  const nodes = useSelector((state: RootState) => state.app.nodes);
  const edges = useSelector((state: RootState) => state.app.edges);

  const [centeredToNode, setCenteredToNode] = useState<Node | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [nodeName, setNodeName] = useState("");
  const [nodeDescription, setNodeDescription] = useState("");

  useOnViewportChange({
    onChange: (viewport: Viewport) => dispatch(setViewportAction(viewport)),
  });

  const focusNode = useCallback(() => {
    if (centeredToNode?.id === selectedNodeId) return;

    const node = nodes.find((x) => x.id === selectedNodeId);

    if (!node) return;

    const x = node.position.x + (node.width ?? 0) / 2;
    const y = node.position.y + (node.height ?? 0) / 2;
    const zoom = 1.85;

    setCenter(x, y, { zoom });
    setCenteredToNode(node);
  }, [centeredToNode, selectedNodeId, nodes, setCenter]);

  useEffect(() => {
    if (centeredToNode) return;
    focusNode();
  }, [centeredToNode, focusNode]);

  useEffect(() => {
    if (!selectedNodeId && nodes.length > 0) {
      dispatch(setSelectedNodeId(nodes[0].id));
    }
  }, [selectedNodeId, nodes, dispatch]);

  const onNodesChangeHandler: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(updateNodes(changes));
    },
    [dispatch],
  );

  const onEdgesChangeHandler: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(updateEdges(changes));
    },
    [dispatch],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const newEdges = addEdge(connection, edges);
      dispatch(setEdges(newEdges));
    },
    [edges, dispatch],
  );

  const onEdgeClick: EdgeMouseHandler = useCallback(
    (_, edge) => {
      dispatch(setSelectedEdgeId(edge.id));
    },
    [dispatch],
  );

  const onEdgeMouseEnter: EdgeMouseHandler = useCallback(
    (_, edge) => {
      dispatch(setHoveredEdgeId(edge.id));
    },
    [dispatch],
  );

  const onEdgeMouseLeave: EdgeMouseHandler = useCallback(() => {
    dispatch(setHoveredEdgeId(null));
  }, [dispatch]);

  const onPaneClick = useCallback(() => {
    dispatch(setSelectedEdgeId(null));
  }, [dispatch]);

  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_, node) => {
      dispatch(setHoveredNodeId(node.id));
    },
    [dispatch],
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    dispatch(setHoveredNodeId(null));
  }, [dispatch]);

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      dispatch(setSelectedNodeId(node.id));
      setNodeName((node.data as NodeData).label || "");
      setNodeDescription((node.data as NodeData).description || "");
      setIsSheetOpen(true);
    },
    [dispatch],
  );

  const handleSubmit = useCallback(() => {
    if (selectedNodeId) {
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: {
                ...node.data,
                label: nodeName,
                description: nodeDescription,
              },
            }
          : node,
      );
      dispatch(updateNodes(updatedNodes));
    }
    setIsSheetOpen(false);
  }, [selectedNodeId, nodeName, nodeDescription, nodes, dispatch]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        background: lightTheme ? "#f0f0f0" : "#333",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChangeHandler}
        onConnect={onConnect}
        onEdgeClick={onEdgeClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onPaneClick={onPaneClick}
        onNodeMouseEnter={onNodeMouseEnter}
        onNodeMouseLeave={onNodeMouseLeave}
        onNodeClick={onNodeClick}
        onNodeDragStart={(_, node) => dispatch(setSelectedNodeId(node.id))}
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
        <Background color={lightTheme ? "#888" : "#aaa"} />
        <Controls />
        <Panel position="top-right">
          <button
            onClick={() => dispatch(toggleMinimalistic())}
            style={{ marginRight: "10px" }}
          >
            {minimalistic ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
          </button>
          <button onClick={() => dispatch(toggleLightTheme())}>
            {lightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </Panel>
        <Panel position="bottom-right">
          <CustomNodeInfo />
        </Panel>
      </ReactFlow>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Node</SheetTitle>
            <SheetDescription>
              Make changes to the selected node.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="name"
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="description"
                value={nodeDescription}
                onChange={(e) => setNodeDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FlowChart;
