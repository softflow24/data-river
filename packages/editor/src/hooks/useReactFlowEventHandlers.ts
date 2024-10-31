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
  Edge,
  OnConnectStart,
  OnConnectEnd,
  OnSelectionChangeFunc,
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
  setConnectingHandle,
  setSelectedNodes,
  setSelectedEdges,
  setNodes,
} from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { setIsRightPanelVisible } from "@slices/layoutSlice";
import { useHotkeys } from "react-hotkeys-hook";
import { isValidConnection } from "@/utils/validation";
import { EdgeData } from "@/types/EdgeTypes";
import useMousePosition from "./useMousePosition";

export const useReactFlowEventHandlers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { screenToFlowPosition } = useReactFlow();
  const batchedChangesRef = useRef<NodeChange[]>([]);
  const mousePosition = useMousePosition();

  const { draggingNodeId, edges, nodes, handles } = useReactFlowState((x) => ({
    draggingNodeId: x.draggingNodeId,
    edges: x.edges,
    nodes: x.nodes,
    handles: x.handles,
  }));

  const debouncedUpdateNodes = useMemo(
    () =>
      _.throttle(
        () => {
          if (batchedChangesRef.current.length > 0) {
            // Merge dimension and position changes, preserve order of other changes
            const dimensionChanges = new Map<string, NodeChange>();
            const positionChanges = new Map<string, NodeChange>();
            const otherChanges: NodeChange[] = [];

            batchedChangesRef.current.forEach((change) => {
              if (change.type === "dimensions") {
                dimensionChanges.set(change.id, change);
              } else if (change.type === "position") {
                positionChanges.set(change.id, change);
              } else {
                otherChanges.push(change);
              }
            });

            const mergedChanges = [
              ...otherChanges,
              ...Array.from(dimensionChanges.values()),
              ...Array.from(positionChanges.values()),
            ];

            dispatch(updateNodes(mergedChanges));
            batchedChangesRef.current = [];
          }
        },
        40,
        { leading: true },
      ),
    [dispatch],
  );

  const onNodesChangeHandler: OnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const hasDimensionsOrPosition = changes.some(
        (change) => change.type === "dimensions" || change.type === "position",
      );

      if (!hasDimensionsOrPosition || draggingNodeId !== null) {
        // For non-dimension/position changes, dispatch immediately
        dispatch(updateNodes(changes));
      } else {
        // For changes including dimensions or position, batch them
        batchedChangesRef.current.push(...changes);
        debouncedUpdateNodes();
      }
    },
    [debouncedUpdateNodes, dispatch, draggingNodeId],
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

  const onSelectionChange: OnSelectionChangeFunc = useCallback(
    (selection) => {
      dispatch(setSelectedNodes(selection.nodes.map((node) => node.id)));
      dispatch(setSelectedEdges(selection.edges.map((edge) => edge.id)));
    },
    [dispatch],
  );

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
      if (!node || !node.id) return;

      dispatch(setSelectedNodeId(node.id));
    },
    [dispatch, setSelectedNodeId],
  );

  const handleMouseMove = useEffect(() => {
    if (draggingNodeId) {
      const flowPosition = screenToFlowPosition({
        x: mousePosition.x,
        y: mousePosition.y + 5,
      });

      const newNodes = nodes.map((node: Node) => {
        if (node.id === draggingNodeId) {
          return {
            ...node,
            position: flowPosition,
            dragging: true,
          };
        }
        return node;
      });

      dispatch(setNodes(newNodes));
    }
  }, [draggingNodeId, screenToFlowPosition, dispatch, mousePosition]);

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
    onSelectionChange,
    handleMouseMove,
  };
};
