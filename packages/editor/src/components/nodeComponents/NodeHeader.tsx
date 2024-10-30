import React from "react";
import {
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import NodeIcon from "../NodeIcon";
import { HandleContainer } from "../handles/HandleContainer";
import { NodeData } from "../../types/NodeTypes";

interface NodeHeaderProps {
  id: string;
  data: NodeData;
  showHandles: boolean;
  hasSingleInput: boolean;
  hasTriggerInput: boolean;
  hasSingleOutput: boolean;
}

export const NodeHeader: React.FC<NodeHeaderProps> = ({
  id,
  data,
  showHandles,
  hasSingleInput,
  hasTriggerInput,
  hasSingleOutput,
}) => {
  return (
    <CardHeader className="flex flex-row justify-between items-center min-w-[9rem]">
      <div className="flex items-center">
        {hasSingleInput && (
          <div className="flex">
            <HandleContainer
              nodeId={id}
              label={Object.keys(data.inputsConfiguration!)[0]}
              renderLabel={false}
              type="input"
              isSelected={showHandles}
              config={Object.values(data.inputsConfiguration!)[0]}
              handleId={`${id}-input-${Object.keys(data.inputsConfiguration!)[0]}`}
            />
          </div>
        )}
        {hasTriggerInput && !hasSingleInput && (
          <div className="flex">
            <HandleContainer
              nodeId={id}
              label="trigger"
              renderLabel={false}
              type="input"
              isSelected={showHandles}
              config={{ type: "boolean", required: false }}
              handleId={`${id}-input-trigger`}
            />
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
            <HandleContainer
              nodeId={id}
              label={Object.keys(data.outputsConfiguration!)[0]}
              renderLabel={false}
              type="output"
              isSelected={showHandles}
              config={Object.values(data.outputsConfiguration!)[0]}
              handleId={`${id}-output-${Object.keys(data.outputsConfiguration!)[0]}`}
            />
          </div>
        )}
      </div>
    </CardHeader>
  );
};
