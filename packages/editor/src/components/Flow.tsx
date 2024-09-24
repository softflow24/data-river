import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
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
  useReactFlow,
  useOnViewportChange,
  useStoreApi,
  Node,
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
import { RootState } from "../store";

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
  const dispatch = useDispatch();

  const { setCenter } = useReactFlow();

  useOnViewportChange({
    onChange: (viewport) => dispatch(setViewportAction(viewport)),
  });

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

  const focusNode = () => {
    if (centeredToNode?.id === selectedNodeId) return;

    const node = nodes.find((x) => x.id === selectedNodeId);

    if (!node) return;

    console.log("focusNode", node);

    const x = node.position.x + (node.width ?? 0) / 2;
    const y = node.position.y + (node.height ?? 0) / 2;
    const zoom = 1.85;

    setCenter(x, y, { zoom });
    setCenteredToNode(node);
  };

  useEffect(() => {
    if (centeredToNode) return;
    focusNode();
  }, [nodes]);

  // Ensure there's always one node selected
  useEffect(() => {
    if (!selectedNodeId && nodes.length > 0) {
      dispatch(setSelectedNodeId(nodes[0].id));
    }
  }, [selectedNodeId, nodes, dispatch]);

  const onNodesChangeHandler = useCallback(
    (changes: NodeChange[]) => {
      dispatch(updateNodes(changes));
    },
    [dispatch],
  );

  const onEdgesChangeHandler = useCallback(
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
    setSelectedEdgeId(null);
  }, []);

  const onNodeMouseEnter: NodeMouseHandler = useCallback(
    (_, node) => {
      dispatch(setHoveredNodeId(node.id));
    },
    [dispatch],
  );

  const onNodeMouseLeave: NodeMouseHandler = useCallback(() => {
    dispatch(setHoveredNodeId(null));
  }, [dispatch]);

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
        onNodeClick={(_, node) => dispatch(setSelectedNodeId(node.id))}
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
    </div>
  );
};

export default FlowChart;
