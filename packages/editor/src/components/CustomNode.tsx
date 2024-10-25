import React from "react";
import { NodeProps } from "reactflow";
import { NodeData } from "../types/NodeTypes";

import SourceHandle from "./SourceHandle";
import TargetHandle from "./TargetHandle";
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

const CustomNode: React.FC<NodeProps<NodeData>> = ({ id, data, selected }) => {
  const { selectedNodeId, hoveredNodeId } = useReactFlowState((state) => ({
    selectedNodeId: state.selectedNodeId,
    hoveredNodeId: state.hoveredNodeId,
  }));
  const executionResult = useExecutionState((x) => x.executionResult);

  const isSelected = id === selectedNodeId || selected;
  const isHovered = hoveredNodeId === id;
  const showHandles =
    isSelected || selectedNodeId === id || hoveredNodeId === id;

  const errorForNode = executionResult.errors.find(
    (error) => error.blockId.toString() === id,
  );

  const hasError = errorForNode !== undefined;
  const highlight = isSelected || selectedNodeId === id;

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
      {data.targetHandle && (
        <TargetHandle handleId={`${id}-target`} isVisible={showHandles} />
      )}
      <CardHeader className="flex flex-row justify-between items-center min-w-[9rem]">
        <CardTitle>{data.label}</CardTitle>
        <NodeIcon
          icon={data.icon}
          color={data.color}
          useBackgroundColor={false}
          useIconColor={false}
        />
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
      </CardContent>
      {data.sourceHandle && (
        <SourceHandle handleId={`${id}-source`} isVisible={showHandles} />
      )}
    </Card>
  );
};

export default CustomNode;
