import React from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import { useDispatch } from "react-redux";
import { setHoveredEdgeId } from "@/store";
import { useReactFlowState } from "@/hooks/useReactFlowState";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
  target,
}) => {
  const dispatch = useDispatch();
  const {
    hoveredNodeId,
    hoveredEdgeId,
    selectedEdgeId,
    selectedNodeId,
    connectingHandle,
    edgeSelectionMode,
    selectedEdges,
  } = useReactFlowState((state) => ({
    hoveredNodeId: state.hoveredNodeId,
    hoveredEdgeId: state.hoveredEdgeId,
    selectedEdgeId: state.selectedEdgeId,
    selectedNodeId: state.selectedNodeId,
    connectingHandle: state.connectingHandle,
    edgeSelectionMode: state.edgeSelectionMode,
    selectedEdges: state.selectedEdges,
  }));

  const isHovered = id === hoveredEdgeId;

  const isSelected = selectedEdges.includes(id);
  const connectedToSelectedNode =
    source === selectedNodeId || target === selectedNodeId;
  const connectedToHoveredNode =
    source === hoveredNodeId || target === hoveredNodeId;

  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const activeStroke =
    isSelected ||
    connectedToSelectedNode ||
    ((isHovered || connectedToHoveredNode) && !connectingHandle)
      ? "hsl(var(--focus))"
      : "hsl(var(--muted-foreground))";

  return (
    <>
      <path
        id={`${id}-hit-area`}
        style={{
          strokeWidth: 20,
          stroke: "transparent",
          fill: "none",
          cursor: "pointer",
        }}
        d={edgePath}
        onMouseEnter={() => {
          dispatch(setHoveredEdgeId(id));
        }}
        onMouseLeave={() => {
          dispatch(setHoveredEdgeId(null));
        }}
      />
      <path
        id={`${id}-custom-edge`}
        style={{
          strokeWidth: 2,
          stroke: activeStroke,
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />
    </>
  );
};

export default CustomEdge;
