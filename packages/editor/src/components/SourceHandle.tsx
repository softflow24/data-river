import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceHandleProps {
  isVisible: boolean;
  style?: React.CSSProperties;
  handleId?: string;
  handleRef?: React.RefObject<HTMLDivElement>;
}

const SourceHandle = React.forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ isVisible, style = {}, handleId }, ref) => {
    // const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "source-handle-wrapper absolute nodrag nowheel my-auto h-5 w-5 rounded-full",
          "flex justify-center items-center bg-focus cursor-pointer opacity-0",
          isVisible && "opacity-100",
        )}
        style={{
          // position: "absolute",
          // top: "50%",
          // right: isVisible ? "-12px" : "0",
          // width: "24px",
          // height: "24px",
          // borderRadius: "50%",
          // background: "hsl(var(--focus))",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // color: "white",

          // cursor: "pointer",
          // opacity: isVisible ? 1 : 0,
          // transition: "translateY 0.1s ease, scale 0.1s ease",
          // transform: false ? "translateY(-46%) scale(1.1)" : "translateY(-50%)",
          ...style,
        }}
      >
        <Plus className="w-3/4 h-3/4" />
        <Handle
          type="source"
          id={handleId}
          className={cn(
            "nodrag nowheel !w-full !h-full !border-none !right-0 opacity-0",
            !isVisible && "!w-1 !h-1 !right-1/2",
          )}
          position={Position.Right}
        />
      </div>
    );
  },
);

export default SourceHandle;
