import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@data-river/shared/ui/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";

interface LogicOperatorSectionProps {
  logicOperator: "AND" | "OR";
  onLogicOperatorChange: (value: "AND" | "OR") => void;
}

const LogicOperatorSection: React.FC<LogicOperatorSectionProps> = ({
  logicOperator,
  onLogicOperatorChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Logic Operator</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={logicOperator} onValueChange={onLogicOperatorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AND">AND</SelectItem>
            <SelectItem value="OR">OR</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LogicOperatorSection;
