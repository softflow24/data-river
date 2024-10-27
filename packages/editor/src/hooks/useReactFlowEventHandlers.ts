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
import { setIsRightPanelVisible } from "@slices/layoutSlice";
import { useHotkeys } from "react-hotkeys-hook";
import { isValidConnection } from "@/utils/validation";

export const useReactFlowEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { screenToFlowPosition } = useReactFlow();
  const rafRef = useRef<number | null>(null);

  const { draggingNodeId, edges } = useReactFlowState((x) => ({
    draggingNodeId: x.draggingNodeId,
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
      console.log(connection);

      const newEdges = addEdge(connection, edges);

      if (!isValidConnection(connection, newEdges)) return;

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
      dispatch(setIsRightPanelVisible(true));
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

  useHotkeys(
    "esc",
    () => {
      if (draggingNodeId) {
        dispatch(cancelDraggingNode());
      } else {
        dispatch(setIsRightPanelVisible(false));
      }
    },
    [draggingNodeId, dispatch],
  );

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [draggingNodeId, handleMouseMove]);

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
  };
};
