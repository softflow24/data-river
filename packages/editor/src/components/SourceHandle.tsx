import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Plus } from "lucide-react";

interface SourceHandleProps {
  isVisible: boolean;
  style?: React.CSSProperties;
  handleId?: string;
  handleRef?: React.RefObject<HTMLDivElement>;
}

const SourceHandle = React.forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ isVisible, style = {}, handleId }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        ref={ref}
        className="source-handle-wrapper nodrag nowheel"
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
          ...style,
        }}
      >
        <Plus size={16} />
        <Handle
          onMouseDown={(x) => {
            console.log(x.currentTarget);
          }}
          type="source"
          id={handleId}
          className="nodrag nowheel"
          position={Position.Right}
          style={{
            background: "transparent",
            border: "none",
            width: "100%",
            height: "100%",
            right: "0",
          }}
        />
      </div>
    );
  },
);

export default SourceHandle;
