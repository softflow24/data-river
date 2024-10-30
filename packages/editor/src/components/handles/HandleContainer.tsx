import React, { useEffect, useMemo, useState } from "react";
import SourceHandle from "../SourceHandle";
import TargetHandle from "../TargetHandle";
import { cn } from "@data-river/shared/ui";
import useReactFlowState from "@/hooks/useReactFlowState";
import { useUpdateNodeInternals } from "@reactflow/core";
import debounce from "lodash.debounce";

interface HandleContainerProps {
  nodeId: string;
  label: string;
  type: "input" | "output";
  isSelected: boolean;
  handleId: string;
  renderLabel: boolean;
  config: { type: string | string[]; required: boolean };
}

export const HandleContainer: React.FC<HandleContainerProps> = ({
  nodeId,
  label,
  type,
  isSelected,
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

  const typeMatch = useMemo(() => {
    const incomingPropertyType = connectingHandle?.propertyType;

    if (
      typeof incomingPropertyType === "string" &&
      typeof handleTypes === "string"
    ) {
      return incomingPropertyType === handleTypes;
    }

    if (
      typeof incomingPropertyType === "string" &&
      Array.isArray(handleTypes)
    ) {
      return handleTypes.includes(incomingPropertyType);
    }

    if (
      Array.isArray(incomingPropertyType) &&
      typeof handleTypes === "string"
    ) {
      return incomingPropertyType.includes(handleTypes);
    }

    if (Array.isArray(incomingPropertyType) && Array.isArray(handleTypes)) {
      const incomingPropertyTypeSet = new Set(incomingPropertyType);
      return handleTypes.some((type) => incomingPropertyTypeSet.has(type));
    }

    return false;
  }, [connectingHandle, handleTypes]);

  const showSourceHandle = useMemo(() => {
    return (
      isSelected &&
      type === "output" &&
      (!connectingHandle || connectingHandle.id === handleId)
    );
  }, [type, connectingHandle?.id, handleId, isSelected]);

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
  }, [debouncedShowSourceHandle, isSelected]);

  return (
    <div className="relative flex items-center h-6 w-full">
      {renderLabel && (
        <div className="flex items-center justify-between w-full">
          <span
            className={cn(
              "text-bold w-full capitalize",
              type === "input" ? "text-left" : "text-right",
              !isSelected && "text-muted-foreground",
              "transition-colors duration-200 ease-in-out",
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
          isVisible={connectingHandle?.nodeId !== nodeId}
          style={{ left: "-30px" }}
        />
      ) : (
        <SourceHandle
          handleId={handleId}
          isVisible={debouncedShowSourceHandle}
          style={{ right: "-34px" }}
        />
      )}
    </div>
  );
};
