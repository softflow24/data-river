import React from "react";
import { Separator } from "@data-river/shared/ui/components/ui/separator";
import { HandleContainer } from "../handles/HandleContainer";

interface NodeHandlesProps {
  nodeId: string;
  showHandles: boolean;
  hasMultipleInputs: boolean;
  hasMultipleOutputs: boolean;
  inputsConfiguration: Record<
    string,
    { type: string | string[]; required: boolean }
  >;
  outputsConfiguration?: Record<
    string,
    { type: string | string[]; required: boolean }
  >;
}

export const NodeHandles: React.FC<NodeHandlesProps> = ({
  nodeId,
  showHandles,
  hasMultipleInputs,
  hasMultipleOutputs,
  inputsConfiguration,
  outputsConfiguration,
}) => {
  const renderHandles = (
    configuration: Record<
      string,
      { type: string | string[]; required: boolean }
    >,
    type: "input" | "output",
  ) => {
    return Object.entries(configuration).map(([key, config]) => (
      <HandleContainer
        key={`${nodeId}-${type}-${key}`}
        nodeId={nodeId}
        label={key}
        renderLabel={true}
        type={type}
        showHandles={showHandles}
        config={config}
        handleId={`${nodeId}-${type}-${key}`}
      />
    ));
  };

  return (
    <div className="flex mt-5 relative">
      <div className="flex flex-col items-center gap-2 w-1/2">
        {hasMultipleInputs && renderHandles(inputsConfiguration, "input")}
      </div>
      {hasMultipleOutputs && hasMultipleInputs && (
        <Separator orientation="vertical" className="absolute left-1/2" />
      )}
      <div className="flex flex-col items-center gap-2 w-1/2">
        {hasMultipleOutputs &&
          outputsConfiguration &&
          renderHandles(outputsConfiguration, "output")}
      </div>
    </div>
  );
};
