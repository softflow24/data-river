import React, { useState } from "react";
import { Handle, Position } from "reactflow";

interface TargetHandleProps {
  isVisible: boolean;
  handleId: string;
}

const TargetHandle: React.FC<TargetHandleProps> = ({ isVisible, handleId }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="target-handle-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: "-6px",
        top: "50%",
        width: "6px",
        height: "12px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        cursor: "pointer",
        background: "#3b82f6",
        opacity: 1,
        transition: "translateY 0.1s ease, scale 0.1s ease",
        transform: isHovered
          ? "translateY(-46%) scale(1.1)"
          : "translateY(-50%)",
        scale: isHovered ? "1.1" : "1",
      }}
    >
      <Handle
        id={handleId}
        type="target"
        position={Position.Left}
        style={{
          background: "transparent",
          border: "none",
          width: "12px",
          height: "12px",
          left: "0px",
        }}
      />
    </div>
  );
};

export default TargetHandle;
