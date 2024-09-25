import React from "react";
import { EdgeProps, getBezierPath } from "reactflow";
import { useSelector, useDispatch } from "react-redux";

import { RootState, setHoveredEdgeId } from "../store";

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
  const hoveredEdgeId = useSelector(
    (state: RootState) => state.app.hoveredEdgeId,
  );
  const selectedEdgeId = useSelector(
    (state: RootState) => state.app.selectedEdgeId,
  );

  const hoveredNodeId = useSelector(
    (state: RootState) => state.app.hoveredNodeId,
  );

  const isHovered = id === hoveredEdgeId;
  const isSelected = id === selectedEdgeId;
  const connectToHoveredNode =
    source === hoveredNodeId || target === hoveredNodeId;

  const [edgePath] = getBezierPath({
    sourceX: sourceX - 10,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const activeStroke =
    isSelected || isHovered || connectToHoveredNode ? "#3b82f6" : "#888";

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
