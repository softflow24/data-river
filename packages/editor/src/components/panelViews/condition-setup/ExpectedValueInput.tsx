import React from "react";
import { Input } from "@data-river/shared/ui/components/ui/input";

interface ExpectedValueInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ExpectedValueInput: React.FC<ExpectedValueInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Expected value"
      className="w-full"
    />
  );
};

export default ExpectedValueInput;
