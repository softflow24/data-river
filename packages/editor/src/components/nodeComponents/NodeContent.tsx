import React from "react";
import { CardContent } from "@data-river/shared/ui/components/ui/card";
import { Separator } from "@data-river/shared/ui/components/ui/separator";
import NodeControls from "./NodeControls";
import { HandleContainer } from "../handles/HandleContainer";

interface NodeContentProps {
  nodeId: string;
  controls?: any;
  config?: any;
  missingFields: string[];
  invalidFields: string[];
  isSelected: boolean;
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

export const NodeContent: React.FC<NodeContentProps> = ({
  nodeId,
  controls,
  config,
  missingFields,
  invalidFields,
  isSelected,
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
        isSelected={isSelected}
        config={config}
        handleId={`${nodeId}-${type}-${key}`}
      />
    ));
  };

  return (
    <CardContent className={controls ? "" : "hidden"}>
      <NodeControls
        nodeId={nodeId}
        controls={controls}
        configuration={config}
        fieldsMissing={missingFields}
        invalidFields={invalidFields}
        isSelected={isSelected}
      />

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
    </CardContent>
  );
};
