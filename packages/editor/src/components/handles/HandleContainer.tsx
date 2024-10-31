import React, { useEffect, useMemo, useState } from "react";
import SourceHandle from "../SourceHandle";
import TargetHandle from "../TargetHandle";
import {
  cn,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@data-river/shared/ui";
import useReactFlowState from "@/hooks/useReactFlowState";
import { useUpdateNodeInternals } from "@reactflow/core";
import debounce from "lodash.debounce";
import { HandleTooltipContent } from "./HandleTooltipContent";
import { checkTypeMatch } from "@/utils/handleTypeMatching";

interface HandleContainerProps {
  nodeId: string;
  label: string;
  type: "input" | "output";
  showHandles: boolean;
  handleId: string;
  renderLabel: boolean;
  config: { type: string | string[]; required: boolean };
}

export const HandleContainer: React.FC<HandleContainerProps> = ({
  nodeId,
  label,
  type,
  showHandles,
  handleId,
  renderLabel,
  config,
}) => {
  const updateNodeInternals = useUpdateNodeInternals();
  const { connectingHandle } = useReactFlowState((x) => ({
    connectingHandle: x.connectingHandle,
  }));

  const [debouncedShowSourceHandle, setDebouncedShowSourceHandle] =
    useState(false);

  const handleTypes = config.type;

  const typeMatch = useMemo(
    () => checkTypeMatch(connectingHandle?.propertyType, handleTypes),
    [connectingHandle?.propertyType, handleTypes],
  );

  const showSourceHandle = useMemo(() => {
    return (
      showHandles &&
      type === "output" &&
      (!connectingHandle || connectingHandle.id === handleId)
    );
  }, [type, connectingHandle?.id, handleId, showHandles]);

  useEffect(() => {
    const handleVisibilityChange = debounce((value: boolean) => {
      setDebouncedShowSourceHandle(value);
    }, 100);

    handleVisibilityChange(showSourceHandle);

    return () => {
      handleVisibilityChange.cancel();
    };
  }, [showSourceHandle]);

  useEffect(() => {
    updateNodeInternals(nodeId);
  }, [showHandles]);

  return (
    <TooltipProvider>
      <Tooltip open={showSourceHandle || type == "input" ? undefined : false}>
        <TooltipTrigger asChild>
          <div className="relative flex items-center h-6 w-full">
            {renderLabel && (
              <div className="flex items-center justify-between w-full">
                <span
                  className={cn(
                    "text-bold w-full capitalize text-muted-foreground",
                    type === "input" ? "text-left" : "text-right",
                    "transition-colors duration-200 ease-in-out",
                    showHandles &&
                      ((type === "output" && !connectingHandle) ||
                        type === "input") &&
                      "text-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
            )}

            {type === "input" ? (
              <TargetHandle
                connectable={connectingHandle?.nodeId !== nodeId && typeMatch}
                connectionInProgress={!!connectingHandle}
                handleId={handleId}
                style={{ left: "-30px" }}
              />
            ) : (
              <SourceHandle
                handleId={handleId}
                connectionInProgress={!!connectingHandle}
                isVisible={debouncedShowSourceHandle}
                style={{ right: "-34px" }}
              />
            )}

            <HandleTooltipContent
              type={type}
              typeMatch={typeMatch}
              handleTypes={handleTypes}
              connectingHandlePropertyType={connectingHandle?.propertyType}
            />
          </div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};
