import React from "react";
import { CardContent } from "@data-river/shared/ui/components/ui/card";
import NodeControls from "./NodeControls";

interface NodeContentProps {
  nodeId: string;
  controls?: any;
  config?: any;
  missingFields: string[];
  invalidFields: string[];
  isSelected: boolean;
  children?: React.ReactNode;
}

export const NodeContent: React.FC<NodeContentProps> = ({
  nodeId,
  controls,
  config,
  missingFields,
  invalidFields,
  isSelected,
  children,
}) => {
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
      {children}
    </CardContent>
  );
};
