import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@data-river/shared/ui/components/ui/select";
import { ComparisonOperator } from "@data-river/shared/types/ComparisonOperator";

interface OperatorSelectProps {
  value: string;
  onChange: (value: string) => void;
  type: "number" | "string" | "boolean" | "date";
}

const operatorOptions: { value: ComparisonOperator; label: string }[] = [
  { value: "==", label: "Equal to" },
  { value: "===", label: "Strictly equal to" },
  { value: "!=", label: "Not equal to" },
  { value: "!==", label: "Strictly not equal to" },
  { value: ">", label: "Greater than" },
  { value: ">=", label: "Greater than or equal to" },
  { value: "<", label: "Less than" },
  { value: "<=", label: "Less than or equal to" },
  { value: "contains", label: "Contains" },
  { value: "not_contains", label: "Does not contain" },
  { value: "starts_with", label: "Starts with" },
  { value: "ends_with", label: "Ends with" },
  { value: "is_empty", label: "Is empty" },
  { value: "is_not_empty", label: "Is not empty" },
];

const OperatorSelect: React.FC<OperatorSelectProps> = ({ value, onChange, type }) => {
  const filteredOptions = operatorOptions.filter((option) => {
    if (type === "string") {
      return true;
    }
    if (type === "number" || type === "date") {
      return !["contains", "not_contains", "starts_with", "ends_with", "is_empty", "is_not_empty"].includes(option.value);
    }
    if (type === "boolean") {
      return ["==", "===", "!=", "!=="].includes(option.value);
    }
    return false;
  });

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {filteredOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default OperatorSelect;
