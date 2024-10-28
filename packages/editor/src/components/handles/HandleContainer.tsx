import React from "react";
import SourceHandle from "../SourceHandle";
import TargetHandle from "../TargetHandle";
import { cn } from "@data-river/shared/ui";

interface HandleContainerProps {
  nodeId: string;
  label: string;
  type: "input" | "output";
  isSelected: boolean;
  handleId: string;
  renderLabel: boolean;
}

export const HandleContainer: React.FC<HandleContainerProps> = ({
  nodeId,
  label,
  type,
  isSelected,
  handleId,
  renderLabel,
}) => {
  return (
    <div className="relative flex items-center h-6 w-full">
      {renderLabel && (
        <div className="flex items-center justify-between w-full">
          <span
            className={cn(
              "text-bold w-full",
              type === "input" ? "text-left" : "text-right",
            )}
          >
            {label}
          </span>
        </div>
      )}
      {type === "input" ? (
        <TargetHandle
          handleId={handleId}
          isVisible={isSelected}
          style={{ left: "-30px" }}
        />
      ) : (
        <SourceHandle
          handleId={handleId}
          isVisible={isSelected}
          style={{ right: "-36px" }}
        />
      )}
    </div>
  );
};
