import { useCallback, useEffect, useMemo, useRef } from "react";
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
  finishDraggingNode,
  cancelDraggingNode,
} from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { setIsRightSidebarVisible } from "@slices/layoutSlice";

export const useReactFlowEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { screenToFlowPosition } = useReactFlow();
  const rafRef = useRef<number | null>(null);

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
    if (draggingNodeId) {
      dispatch(finishDraggingNode());
    }
  }, [dispatch, draggingNodeId]);

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

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (draggingNodeId) {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          const flowPosition = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY + 5,
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
    console.log("handleMouseUp");
    if (draggingNodeId) {
      dispatch(finishDraggingNode());
    }
  }, [draggingNodeId, dispatch]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && draggingNodeId) {
        dispatch(cancelDraggingNode());
      }
    },
    [draggingNodeId, dispatch],
  );

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [draggingNodeId, handleMouseMove, handleMouseUp, handleKeyDown]);

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
    handleMouseMove,
    handleMouseUp,
    handleKeyDown,
  };
};
