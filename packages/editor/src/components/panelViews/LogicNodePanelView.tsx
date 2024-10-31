import React from "react";
import { ICondition } from "@data-river/shared/interfaces/ICondition";
import ConditionsSection from "./ConditionsSection";

interface LogicNodePanelViewProps {
  nodeId: string;
  config: {
    logicOperator: "AND" | "OR";
    conditions: ICondition[];
  };
  onConfigChange: (config: any) => void;
  inputsConfiguration: Record<string, unknown>;
}

const LogicNodePanelView: React.FC<LogicNodePanelViewProps> = ({
  nodeId,
  config,
  onConfigChange,
  inputsConfiguration,
}) => {
  const handleConditionsChange = (conditions: ICondition[]) => {
    onConfigChange({ ...config, conditions });
  };

  const handleLogicOperatorChange = (value: "AND" | "OR") => {
    onConfigChange({ ...config, logicOperator: value });
  };

  return (
    <div className="space-y-4">
      <ConditionsSection
        conditions={config.conditions}
        logicOperator={config.logicOperator}
        onConditionsChange={handleConditionsChange}
        onLogicOperatorChange={handleLogicOperatorChange}
        logicNodeInputs={Object.keys(inputsConfiguration)}
      />
    </div>
  );
};

export default LogicNodePanelView;
