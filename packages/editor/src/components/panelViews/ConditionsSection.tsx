import React from "react";
import { ICondition } from "@data-river/shared/interfaces/ICondition";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import ConditionSetup from "./ConditionSetup";

interface ConditionsSectionProps {
  conditions: ICondition[];
  logicOperator: "AND" | "OR";
  onConditionsChange: (conditions: ICondition[]) => void;
  onLogicOperatorChange: (operator: "AND" | "OR") => void;
  logicNodeInputs: string[];
}

const ConditionsSection: React.FC<ConditionsSectionProps> = ({
  conditions,
  logicOperator,
  onConditionsChange,
  onLogicOperatorChange,
  logicNodeInputs,
}) => {
  return (
    <>
      <h3 className="text-lg font-medium semibold">Conditions:</h3>
      <ConditionSetup
        conditions={conditions}
        logicOperator={logicOperator}
        onConditionsChange={onConditionsChange}
        onLogicOperatorChange={onLogicOperatorChange}
        logicNodeInputs={logicNodeInputs}
      />
    </>
  );
};

export default ConditionsSection;
