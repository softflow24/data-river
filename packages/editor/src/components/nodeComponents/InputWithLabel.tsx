import { Label } from "@data-river/shared/ui/components/ui/label";
import { Input } from "@data-river/shared/ui/components/ui/input";
const InputWithLabel = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  inputClassName,
}: {
  label: string;
  name: string;
  placeholder: string | undefined;
  value: string;
  onChange: (value: string) => void;
  inputClassName?: string;
}) => {
  return (
    <div className="grid gap-2">
      <Label className="text-muted-foreground" htmlFor={name}>
        {label}
      </Label>
      <Input
        className={`w-full ${inputClassName}`}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default InputWithLabel;
