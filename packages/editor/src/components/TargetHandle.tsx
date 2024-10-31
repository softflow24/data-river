import { cn } from "@/lib/utils";
import React from "react";
import { Handle, Position } from "reactflow";

interface TargetHandleProps {
  connectable: boolean;
  connectionInProgress: boolean;
  handleId: string;
  style?: React.CSSProperties;
}

const TargetHandle = React.forwardRef<HTMLDivElement, TargetHandleProps>(
  ({ connectable, connectionInProgress, handleId, style = {} }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "target-handle-wrapper absolute bg-focus flex justify-start items-center cursor-pointer h-4 w-1.5",
          connectionInProgress && !connectable && "bg-muted",
          "transition-transform duration-100 ease-in-out",
          "hover:-translate-y-[46%] hover:scale-110 -translate-y-1/2",
          "left-[-6px] top-1/2",
        )}
        style={{
          ...style,
        }}
      >
        <Handle
          id={handleId}
          className="!w-1/2 !h-1/2 !left-1/2 opacity-0"
          isConnectable={connectable}
          type="target"
          position={Position.Left}
        />
      </div>
    );
  },
);

TargetHandle.displayName = "TargetHandle";

export default TargetHandle;
