import React from "react";
import { Label } from "@data-river/shared/ui/components/ui/label";
import { Textarea } from "@data-river/shared/ui/components/ui/textarea";

interface TextAreaWithLabelProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const TextAreaWithLabel: React.FC<TextAreaWithLabelProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        className="nodrag nowheel min-w-[20rem]"
        id={name}
        placeholder={placeholder}
        value={typeof value === "object" ? JSON.stringify(value) : value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={(e) => onBlur?.(e.target.value)}
      />
    </div>
  );
};

export default TextAreaWithLabel;
