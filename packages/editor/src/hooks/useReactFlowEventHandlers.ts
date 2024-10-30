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
  Edge,
  OnConnectStart,
  OnConnectEnd,
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
  removeHandles,
  setConnectingHandle,
} from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { setIsRightPanelVisible } from "@slices/layoutSlice";
import { useHotkeys } from "react-hotkeys-hook";
import { isValidConnection } from "@/utils/validation";
import { EdgeData } from "@/types/EdgeTypes";

export const useReactFlowEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { screenToFlowPosition } = useReactFlow();
  const rafRef = useRef<number | null>(null);

  const { draggingNodeId, edges, handles } = useReactFlowState((x) => ({
    draggingNodeId: x.draggingNodeId,
    edges: x.edges,
    handles: x.handles,
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

      if (!isValidConnection(connection, newEdges)) return;

      const handleMap = new Map(handles.map((handle) => [handle.id, handle]));

      const sourceHandle = handleMap.get(connection.sourceHandle!);
      const targetHandle = handleMap.get(connection.targetHandle!);

      if (!sourceHandle || !targetHandle) {
        throw Error("Handle not found");
      }

      const data: EdgeData = {
        sourceProperty: sourceHandle.property,
        sourceType: sourceHandle.propertyType,
        targetProperty: targetHandle.property,
        targetType: targetHandle.propertyType,
      };

      const edge: Edge<EdgeData> = newEdges.find(
        (e) =>
          e.sourceHandle === connection.sourceHandle &&
          e.targetHandle === connection.targetHandle,
      )!;

      edge.data = data;

      dispatch(setEdges(newEdges));
    },
    [edges, dispatch, handles],
  );

  const onConnectStart: OnConnectStart = useCallback(
    (_, connection) => {
      dispatch(setConnectingHandle(connection.handleId));
      dispatch(setIsRightPanelVisible(false));
    },
    [dispatch],
  );

  const onConnectEnd: OnConnectEnd = useCallback(() => {
    dispatch(setConnectingHandle(null));
    dispatch(setIsRightPanelVisible(true));
  }, [dispatch]);

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
      if (!node || !node.id) return;

      dispatch(setSelectedNodeId(node.id));
      dispatch(setIsRightPanelVisible(true));
    },
    [dispatch, setSelectedNodeId, setIsRightPanelVisible],
  );

  const onNodeDragStart = useCallback(
    (_: React.MouseEvent, node: Node) => {
      console.log("onNodeDragStart", node);
      if (!node || !node.id) return;

      dispatch(setSelectedNodeId(node.id));
    },
    [dispatch, setSelectedNodeId],
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
    onConnectStart,
    onConnectEnd,
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
