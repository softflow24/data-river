import React, { useMemo } from "react";
import { NodeProps } from "reactflow";
import { NodeData } from "../types/NodeTypes";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { Card } from "@data-river/shared/ui/components/ui/card";
import { useExecutionState } from "@/hooks/useExecutionState";
import clsx from "clsx";
import { createBlockValidationErrorFromObject } from "@data-river/blocks/errors/blockValidationError";
import { NodeHeader } from "./nodeComponents/NodeHeader";
import { NodeContent } from "./nodeComponents/NodeContent";
import { NodeHandles } from "./nodeComponents/NodeHandles";

const CustomNode: React.FC<NodeProps<NodeData>> = ({ id, data }) => {
  const { selectedNodeId, selectedNodes, hoveredNodeId, nodeSelectionMode } =
    useReactFlowState((state) => ({
      selectedNodeId: state.selectedNodeId,
      selectedNodes: state.selectedNodes,
      hoveredNodeId: state.hoveredNodeId,
      nodeSelectionMode: state.nodeSelectionMode,
    }));

  const executionResult = useExecutionState((x) => x.executionResult);

  const { hasMultipleOutputs, hasSingleOutput } = useMemo(
    () => ({
      hasMultipleOutputs: Boolean(
        data.outputsConfiguration &&
          Object.keys(data.outputsConfiguration).length > 1,
      ),
      hasSingleOutput: Boolean(
        data.outputsConfiguration &&
          Object.keys(data.outputsConfiguration).length === 1,
      ),
    }),
    [data.outputsConfiguration],
  );

  const { hasMultipleInputs, hasSingleInput, hasTriggerInput } = useMemo(
    () => ({
      hasMultipleInputs: Boolean(
        data.inputsConfiguration &&
          Object.keys(data.inputsConfiguration).length > 1,
      ),
      hasSingleInput: Boolean(
        data.inputsConfiguration &&
          Object.keys(data.inputsConfiguration).length === 1,
      ),
      hasTriggerInput: Boolean(
        data.inputsConfiguration &&
          Object.keys(data.inputsConfiguration).includes("trigger"),
      ),
    }),
    [data.inputsConfiguration],
  );

  const isSelected = useMemo(() => {
    if (nodeSelectionMode === "multiple") {
      return selectedNodes.includes(id);
    }
    return id === selectedNodeId;
  }, [nodeSelectionMode, selectedNodes, selectedNodeId, id]);
  const isHovered = hoveredNodeId === id;
  const showHandles = isSelected || isHovered;

  const errorForNode = executionResult.errors.find(
    (error) => error.blockId.toString() === id,
  );

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

  const missingFields = validationError?.missingFields ?? [];
  const invalidFields = validationError?.invalidFields ?? [];

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
        ${(isSelected || isHovered) && "border-focus"}
        ${errorForNode && "border-destructive"}
      `)}
      data-custom-node-id={id}
    >
      <NodeHeader
        id={id}
        data={data}
        showHandles={showHandles}
        hasSingleInput={hasSingleInput}
        hasTriggerInput={hasTriggerInput}
        hasSingleOutput={hasSingleOutput}
      />

      <NodeContent
        nodeId={id}
        controls={data.controls}
        config={data.config}
        missingFields={missingFields}
        invalidFields={invalidFields}
        isSelected={isSelected}
      >
        <NodeHandles
          nodeId={id}
          showHandles={showHandles}
          hasMultipleInputs={hasMultipleInputs}
          hasMultipleOutputs={hasMultipleOutputs}
          inputsConfiguration={inputsConfiguration}
          outputsConfiguration={data.outputsConfiguration}
        />
      </NodeContent>
    </Card>
  );
};

export default CustomNode;
