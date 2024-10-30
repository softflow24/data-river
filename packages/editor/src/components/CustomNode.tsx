import React, { useMemo } from "react";
import { NodeProps } from "reactflow";
import { NodeData } from "../types/NodeTypes";
import NodeIcon from "./NodeIcon";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import NodeControls from "./nodeComponents/NodeControls";
import { useExecutionState } from "@/hooks/useExecutionState";
import clsx from "clsx";
import { createBlockValidationErrorFromObject } from "@data-river/blocks/errors/blockValidationError";
import { HandleContainer } from "./handles/HandleContainer";
import { Separator } from "@data-river/shared/ui/components/ui/separator";

const CustomNode: React.FC<NodeProps<NodeData>> = ({ id, data }) => {
  const { selectedNodeId, hoveredNodeId } = useReactFlowState((state) => ({
    selectedNodeId: state.selectedNodeId,
    hoveredNodeId: state.hoveredNodeId,
  }));

  const executionResult = useExecutionState((x) => x.executionResult);

  const { hasMultipleOutputs, hasSingleOutput } = useMemo(() => {
    return {
      hasMultipleOutputs:
        data.outputsConfiguration &&
        Object.keys(data.outputsConfiguration).length > 1,
      hasSingleOutput:
        data.outputsConfiguration &&
        Object.keys(data.outputsConfiguration).length === 1,
    };
  }, [data.outputsConfiguration]);

  const { hasMultipleInputs, hasSingleInput, hasTriggerInput } = useMemo(() => {
    return {
      hasMultipleInputs:
        data.inputsConfiguration &&
        Object.keys(data.inputsConfiguration).length > 1,
      hasSingleInput:
        data.inputsConfiguration &&
        Object.keys(data.inputsConfiguration).length === 1,
      hasTriggerInput:
        data.inputsConfiguration &&
        Object.keys(data.inputsConfiguration).includes("trigger"),
    };
  }, [data.inputsConfiguration]);

  const isSelected = id === selectedNodeId;
  const isHovered = hoveredNodeId === id;
  const showHandles =
    isSelected || selectedNodeId === id || hoveredNodeId === id;

  const errorForNode = executionResult.errors.find(
    (error) => error.blockId.toString() === id,
  );

  const hasError = errorForNode !== undefined;
  const highlight = isSelected || isHovered;

  const validationError =
    errorForNode?.error.name === "BlockValidationError"
      ? createBlockValidationErrorFromObject(
          errorForNode.error as unknown as {
            message: string;
            missingFields: string[];
            invalidFields: string[];
            validationType: "input" | "output";
          },
        )
      : undefined;

  let missingFields: string[] = [];
  let invalidFields: string[] = [];

  if (validationError) {
    missingFields = validationError.missingFields ?? [];
    invalidFields = validationError.invalidFields ?? [];
  }

  const renderHandles = (
    configuration: Record<
      string,
      { type: string | string[]; required: boolean }
    >,
    type: "input" | "output",
  ) => {
    const handles = useMemo(
      () => Object.entries(configuration),
      [configuration],
    );

    return handles.map(([key, config]) => (
      <HandleContainer
        key={`${id}-${type}-${key}`}
        nodeId={id}
        label={key}
        renderLabel={handles.length > 1}
        type={type}
        isSelected={showHandles}
        config={config}
        handleId={`${id}-${type}-${key}`}
      />
    ));
  };

  let inputsConfiguration = data.inputsConfiguration ?? {};
  if (hasTriggerInput && !hasSingleInput) {
    inputsConfiguration = Object.fromEntries(
      Object.entries(inputsConfiguration).filter(([key]) => key !== "trigger"),
    );
  }

  return (
    <Card
      className={clsx(`
        border
        ${isHovered ? "shadow-lg" : ""}
        ${highlight && "border-focus"}
        ${hasError && "border-destructive"}
        `)}
      data-custom-node-id={id}
    >
      <CardHeader className="flex flex-row justify-between items-center min-w-[9rem]">
        <div className="flex items-center">
          {hasSingleInput && (
            <div className="flex">
              {renderHandles(data.inputsConfiguration!, "input")}
            </div>
          )}
          {hasTriggerInput && !hasSingleInput && (
            <div className="flex">
              {renderHandles(
                { trigger: { type: "boolean", required: false } },
                "input",
              )}
            </div>
          )}
          <CardTitle>{data.label}</CardTitle>
        </div>
        <div className="flex items-center">
          <NodeIcon
            icon={data.icon}
            color={data.color}
            useBackgroundColor={false}
            useIconColor={false}
          />

          {hasSingleOutput && (
            <div className="flex">
              {renderHandles(data.outputsConfiguration!, "output")}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className={data.controls ? "" : "hidden"}>
        <NodeControls
          nodeId={id}
          controls={data.controls}
          configuration={data.config}
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
              renderHandles(data.outputsConfiguration!, "output")}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomNode;
