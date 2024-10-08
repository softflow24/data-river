import React from "react";
import { Badge } from "@data-river/shared/ui/components/ui/badge";
import { AlertCircle, Variable } from "lucide-react";
import { ICondition } from "@data-river/shared/interfaces/ICondition";

export interface ConditionsSummaryProps {
  logicOperator: "AND" | "OR";
  conditions: ICondition[];
  maxVisibleConditions?: number;
}

const ConditionsSummary: React.FC<ConditionsSummaryProps> = ({
  logicOperator,
  conditions,
  maxVisibleConditions = 2,
}) => {
  const renderCondition = (condition: ICondition) => {
    if (!condition.left || !condition.operator || !condition.right) {
      return (
        <div className="flex items-center text-yellow-500 bg-secondary border border-yellow-200 rounded p-2">
          <AlertCircle className="w-4 h-4 mr-1" />
          <span className="text-sm">Condition missing</span>
        </div>
      );
    }

    return (
      <div className="flex space-x-1 items-center bg-background border rounded p-2">
        <Variable className="w-4 h-4 text-focus" />
        <span className="text-sm text-muted-foreground">{condition.left}</span>
        <span className={"text-sm font-bold"}>{condition.operator}</span>
        <span className="text-sm font-light text-muted-foreground">
          {condition.right}
        </span>
      </div>
    );
  };

  if (conditions.length === 0) {
    return (
      <span className="text-muted-foreground w-72">
        No conditions, this will always be true
      </span>
    );
  }

  return (
    <div>
      {conditions.slice(0, maxVisibleConditions).map((condition, index) => (
        <div key={index}>
          {renderCondition(condition)}
          {index + 1 < Math.min(conditions.length, maxVisibleConditions) && (
            <div className="flex justify-end -my-1">
              <Badge className="select-none hover:cursor-default text-xs py-0.5 relative -mr-4">
                {logicOperator}
              </Badge>
            </div>
          )}
        </div>
      ))}

      {conditions.length > maxVisibleConditions && (
        <div className="text-muted-foreground text-center text-sm mt-4">
          + {conditions.length - maxVisibleConditions} more condition
          {conditions.length - maxVisibleConditions > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default ConditionsSummary;
