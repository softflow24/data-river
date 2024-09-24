import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Plus } from "lucide-react";

interface SourceHandleProps {
  isVisible: boolean;
}

const SourceHandle: React.FC<SourceHandleProps> = ({ isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="source-handle-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        top: "50%",
        right: isVisible ? "-12px" : "0",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: "#3b82f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transition: "translateY 0.1s ease, scale 0.1s ease",
        transform: isHovered
          ? "translateY(-46%) scale(1.1)"
          : "translateY(-50%)",
        scale: isHovered ? "1.1" : "1",
      }}
    >
      <Plus size={16} />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "transparent",
          border: "none",
          width: "12px",
          height: "12px",
          right: "0px",
        }}
      />
    </div>
  );
};

export default SourceHandle;
