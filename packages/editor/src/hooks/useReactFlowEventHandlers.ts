import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store";
import {
  NodeChange,
  EdgeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeMouseHandler,
  EdgeMouseHandler,
  addEdge,
  Node,
  useReactFlow,
  NodePositionChange,
} from "reactflow";
import _ from "lodash";
import {
  updateNodes,
  updateEdges,
  setEdges,
  setSelectedEdgeId,
  setHoveredEdgeId,
  setHoveredNodeId,
  setSelectedNodeId,
} from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { setIsRightSidebarVisible } from "@slices/layoutSlice";

export const useReactFlowEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { screenToFlowPosition } = useReactFlow();

  const { draggingNodeId, nodes, edges } = useReactFlowState((x) => ({
    draggingNodeId: x.draggingNodeId,
    nodes: x.nodes,
    edges: x.edges,
  }));

  const debouncedUpdateNodes = useMemo(
    () =>
      _.debounce((changes: NodeChange[]) => dispatch(updateNodes(changes)), 1),
    [dispatch],
  );

  // const draggingNode = useMemo(() => {
  //   return nodes.find((x) => x.id === draggingNodeId);
  // }, [draggingNodeId, nodes]);

  // useEffect(() => {
  //   if (!draggingNode) return;

  //   const { x, y } = draggingNode.position;

  //   const mouseMoveHandler = (e: MouseEvent) => {
  //     console.log("mousemove", e);
  //   };

  //   document.addEventListener("mousemove", mouseMoveHandler);

  //   if (x === 0 && y === 0) return;

  //   const nodeChange: NodePositionChange = {
  //     id: draggingNode.id,
  //     type: "position",
  //     position: { x: 0, y: 0 },
  //     positionAbsolute: { x: 0, y: 0 },
  //     dragging: true,
  //   };

  //   dispatch(updateNodes([nodeChange]));

  //   // const { x, y } = screenToFlowPosition(draggingNode.position);

  //   return () => {
  //     document.removeEventListener("mousemove", mouseMoveHandler);
  //   };
  // }, [draggingNode]);

  const onNodesChangeHandler: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      debouncedUpdateNodes(changes);
    },
    [debouncedUpdateNodes],
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
      dispatch(setIsRightSidebarVisible(true));
    },
    [dispatch],
  );

  const onNodeDragStart = useCallback(
    (_: React.MouseEvent, node: Node) => {
      dispatch(setSelectedNodeId(node.id));
    },
    [dispatch],
  );

  return {
    onNodesChangeHandler,
    onEdgesChangeHandler,
    onConnect,
    onEdgeClick,
    onEdgeMouseEnter,
    onEdgeMouseLeave,
    onPaneClick,
    onNodeMouseEnter,
    onNodeMouseLeave,
    onNodeClick,
    onNodeDragStart,
  };
};
