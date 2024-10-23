import React, { useMemo } from "react";
import { NodeData } from "../../types/NodeTypes";
import InputWithLabel from "./InputWithLabel";
import TextAreaWithLabel from "./TextAreaWithLabel";
import SelectWithLabel from "./SelectWithLabel";
import { Label } from "@data-river/shared/ui/components/ui/label";
import NodeIcon from "../NodeIcon";
import { updateExecutionBlockInputs } from "@/slices/executionSlice";
import { useDispatch } from "react-redux";
import { useExecutionState } from "@/hooks/useExecutionState";
import { updateNodesData } from "@/slices/reactFlowSlice";
import { useReactFlowState } from "@/hooks/useReactFlowState";
import { LogicBlock } from "./LogicBlock";
import { ConditionsSummaryProps } from "./LogicBlock/ConditionsSummary";
import RequestBlock from "./RequestBlock";
import { RequestFormData } from "@data-river/shared/contracts/blocks/request";

interface NodeControlsProps {
  nodeId: string;
  controls: NodeData["controls"];
  configuration: NodeData["config"];
  fieldsMissing: string[];
  invalidFields: string[];
  isSelected: boolean;
}

const NodeControls: React.FC<NodeControlsProps> = ({
  nodeId,
  controls,
  fieldsMissing,
  invalidFields,
  configuration,
  isSelected,
}) => {
  const dispatch = useDispatch();

  const { nodes } = useReactFlowState((state) => ({
    nodes: state.nodes,
  }));
  const executionBlocks = useExecutionState((state) => state.executionBlocks);
  const executionResult = useExecutionState((state) => state.executionResult);

  const executionBlock = useMemo(() => {
    return executionBlocks.find((block) => block.id === nodeId);
  }, [executionBlocks, nodeId]);

  const result = useMemo(() => {
    return executionResult.result.find((result) => result.nodeId === nodeId);
  }, [executionResult, nodeId]);

  const fieldsMissingMap = useMemo(() => {
    return new Map(fieldsMissing.map((field) => [field, true]));
  }, [fieldsMissing]);

  const fieldsInvalidMap = useMemo(() => {
    return new Map(invalidFields.map((field) => [field, true]));
  }, [invalidFields]);

  const node = useMemo(() => {
    return nodes.find((node) => node.id === nodeId);
  }, [nodes, nodeId]);

  const outputValue = useMemo(() => {
    if (!result) {
      return;
    }

    if (result.nodeType.includes("output")) {
      return Object.values(result.outputs)[0];
    }
  }, [result]);

  const handleValueChange = (name: string, value: string) => {
    dispatch(
      updateExecutionBlockInputs({
        id: nodeId,
        inputs: { [name]: value },
      }),
    );

    dispatch(
      updateNodesData([
        {
          id: nodeId,
          data: {
            config: {
              ...(node?.data.config || {}),
              [name]: value,
            },
          },
        },
      ]),
    );
  };

  if (!controls || controls.length === 0 || !executionBlock || !node)
    return null;

  return (
    <div className="grid w-full items-center gap-2">
      <div className="flex flex-col space-y-1.5">
        {controls.map((control, index) => {
          const invalidValue =
            fieldsInvalidMap.has(control.name) ||
            fieldsMissingMap.has(control.name);

          const value =
            configuration && configuration[control.name]
              ? configuration[control.name]
              : node.data.inputs && node.data.inputs[control.name]
                ? node.data.inputs[control.name]
                : (outputValue ?? "");

          switch (control.type) {
            case "text":
              return (
                <InputWithLabel
                  key={index}
                  label={control.label}
                  name={control.name}
                  placeholder={control.placeholder}
                  inputClassName={`nodrag nowheel ${invalidValue ? "border-red-500" : ""}`}
                  value={value as string}
                  onChange={(value) => handleValueChange(control.name, value)}
                />
              );
            case "text-area":
              return (
                <TextAreaWithLabel
                  key={index}
                  label={control.label}
                  name={control.name}
                  placeholder={control.placeholder}
                  value={value as string}
                  onChange={(value) => handleValueChange(control.name, value)}
                />
              );
            case "select":
              return (
                <SelectWithLabel
                  key={index}
                  label={control.label}
                  name={control.name}
                  value={value as string}
                  options={control.options || []}
                  onChange={(value) => handleValueChange(control.name, value)}
                />
              );
            case "conditions-summary":
              return (
                <LogicBlock
                  key={index}
                  nodeId={nodeId}
                  config={configuration as unknown as ConditionsSummaryProps}
                  isSelected={isSelected}
                />
              );
            case "request-info":
              return (
                <RequestBlock
                  key={index}
                  nodeId={nodeId}
                  config={configuration as unknown as RequestFormData}
                  isSelected={isSelected}
                />
              );
            default:
              return (
                <div key={index} className="flex items-center gap-2">
                  <NodeIcon
                    icon={"OctagonAlert"}
                    color={"rgb(234 179 8)"}
                    useBackgroundColor={true}
                    useIconColor={false}
                  />
                  <Label>Unknown control type: {control.type}</Label>
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

export default NodeControls;
