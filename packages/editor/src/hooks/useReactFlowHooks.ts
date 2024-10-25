import { useCallback, useEffect, useState, useMemo } from "react";
import { Node, useReactFlow, useOnViewportChange, Viewport } from "reactflow";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { AppDispatch } from "@store";
import { setViewport, setSelectedNodeId } from "@slices/reactFlowSlice";
import { useReactFlowState } from "@hooks/useReactFlowState";

export const useReactFlowHooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { setCenter } = useReactFlow();
  const [centeredToNode, setCenteredToNode] = useState<Node | null>(null);
  const { selectedNodeId, nodes } = useReactFlowState((state) => ({
    selectedNodeId: state.selectedNodeId,
    nodes: state.nodes,
  }));

  // ! Debounce setViewport to prevent excessive state updates
  // ! If you don't do this, the viewport will jitter when you start dragging
  const debouncedSetViewport = useMemo(
    () =>
      _.debounce((viewport: Viewport) => dispatch(setViewport(viewport)), 100),
    [dispatch],
  );

  useOnViewportChange({
    onChange: (viewport: Viewport) => {
      debouncedSetViewport(viewport);
    },
  });

  useEffect(() => {
    return () => {
      debouncedSetViewport.cancel();
    };
  }, [debouncedSetViewport]);

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

  return { focusNode };
};
