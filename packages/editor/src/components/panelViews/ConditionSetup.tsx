import React from "react";
import { ICondition } from "@data-river/shared/interfaces/ICondition";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@data-river/shared/ui/components/ui/card";
import VariableSelect from "./condition-setup/VariableSelect";
import OperatorSelect from "./condition-setup/OperatorSelect";
import ExpectedValueInput from "./condition-setup/ExpectedValueInput";
import { Badge } from "@data-river/shared/ui/components/ui/badge";

interface ConditionSetupProps {
  conditions: ICondition[];
  logicOperator: "AND" | "OR";
  onConditionsChange: (conditions: ICondition[]) => void;
  onLogicOperatorChange: (operator: "AND" | "OR") => void;
  logicNodeInputs: string[];
}

const ConditionSetup: React.FC<ConditionSetupProps> = ({
  conditions,
  logicOperator,
  onConditionsChange,
  onLogicOperatorChange,
  logicNodeInputs,
}) => {
  const updateCondition = (
    index: number,
    field: keyof ICondition,
    value: string,
  ) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    onConditionsChange(newConditions);
  };

  const removeCondition = (index: number) => {
    const newConditions = conditions.filter((_, i) => i !== index);
    onConditionsChange(newConditions);
  };

  const toggleLogicOperator = () => {
    onLogicOperatorChange(logicOperator === "AND" ? "OR" : "AND");
  };

  const newConditionTestValue =
    conditions.length > 0
      ? conditions[conditions.length - 1].left
      : `inputs.${logicNodeInputs[0]}`;

  return (
    <div className="space-y-2">
      {conditions.map((condition, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center space-x-2">
            <Card className="flex-grow">
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <VariableSelect
                    value={condition.left}
                    onChange={(value) => updateCondition(index, "left", value)}
                    logicNodeInputs={logicNodeInputs}
                  />
                  <OperatorSelect
                    value={condition.operator}
                    onChange={(value) =>
                      updateCondition(index, "operator", value)
                    }
                  />
                </div>
                <ExpectedValueInput
                  value={condition.right}
                  onChange={(value) => updateCondition(index, "right", value)}
                />
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCondition(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {index < conditions.length - 1 && (
            <div className="flex justify-center">
              <Badge
                onClick={toggleLogicOperator}
                className="cursor-pointer select-none text-sm"
                variant={"secondary"}
              >
                {logicOperator}
              </Badge>
            </div>
          )}
        </React.Fragment>
      ))}
      <Button
        onClick={() =>
          onConditionsChange([
            ...conditions,
            {
              left: newConditionTestValue,
              operator: "==",
              right: "",
            },
          ])
        }
        className=" mt-2"
        variant="outline"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Condition
      </Button>
    </div>
  );
};

export default ConditionSetup;
