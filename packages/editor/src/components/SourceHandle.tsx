import React, { useState, useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";
import { useReactFlowState } from "@/hooks/useReactFlowState";

interface SourceHandleProps {
  isVisible: boolean;
  style?: React.CSSProperties;
  handleId?: string;
  handleRef?: React.RefObject<HTMLDivElement>;
  connectionInProgress: boolean;
}

const SourceHandle = React.forwardRef<HTMLDivElement, SourceHandleProps>(
  ({ isVisible, style = {}, handleId, connectionInProgress }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const { zoom } = useReactFlowState((state) => ({
      zoom: state.viewport.zoom,
    }));

    const handleHoverStart = useCallback(
      debounce(() => setIsHovered(true), 50),
      [],
    );

    const handleHoverEnd = useCallback(
      debounce(() => setIsHovered(false), 50),
      [],
    );

    return (
      <div
        style={{
          ...style,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "20px",
          height: "20px",
        }}
      >
        <motion.div
          ref={ref}
          key={zoom}
          initial={{
            width: isVisible ? "20px" : 0,
            height: isVisible ? "20px" : 0,
          }}
          animate={{
            width: isVisible ? "20px" : 0,
            height: isVisible ? "20px" : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
          className={cn(
            "source-handle-wrapper absolute nodrag nowheel rounded-full",
            "flex justify-center items-center bg-focus cursor-pointer",
          )}
        >
          <Plus
            size={16}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `scale(${isVisible ? 1 : 0})`,
              transition: "all 0.15s ease-out",
              transitionDelay: "0.1s",
              shapeRendering: "geometricPrecision",
            }}
          />
          <Handle
            type="source"
            id={handleId}
            isConnectable={!connectionInProgress}
            className={cn(
              "nodrag nowheel !w-full !h-full !border-none !right-0 opacity-0",
              !isVisible && "!w-1 !h-1 !right-1/2",
            )}
            position={Position.Right}
          />
        </motion.div>
      </div>
    );
  },
);

export default SourceHandle;
