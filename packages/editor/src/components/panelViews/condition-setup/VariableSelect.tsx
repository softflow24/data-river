import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@data-river/shared/ui/components/ui/select";
import { Variable } from "lucide-react";

interface VariableSelectProps {
  value: string;
  onChange: (value: string) => void;
  logicNodeInputs: string[];
}

const VariableSelect: React.FC<VariableSelectProps> = ({
  value,
  onChange,
  logicNodeInputs,
}) => {
  logicNodeInputs = logicNodeInputs.map((input) => `inputs.${input}`);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select variable" />
      </SelectTrigger>
      <SelectContent>
        {logicNodeInputs.map((input) => (
          <SelectItem key={input} value={input}>
            <div className="flex items-center">
              <Variable className="w-4 h-4 mr-2 text-blue-500" />
              {input}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default VariableSelect;
