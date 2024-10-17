import { Label } from "@data-river/shared/ui/components/ui/label";
import { Input } from "@data-river/shared/ui/components/ui/input";
import { CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useToast } from "@data-river/shared/ui";

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
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  inputClassName?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleCopy = (
    event: React.MouseEvent<HTMLDivElement> & React.MouseEvent<SVGSVGElement>,
  ) => {
    event.stopPropagation();
    navigator.clipboard.writeText(value);
    toast({
      description: "Copied to clipboard!",
      duration: 2000,
    });
  };

  return (
    <div className="grid gap-2 w-full nodrag">
      <Label className="text-muted-foreground" htmlFor={name}>
        {label}
      </Label>
      {onChange ? (
        <Input
          className={`w-full ${inputClassName}`}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span
            className={`text-sm text-muted-foreground w-full border border-input rounded-md p-2 text-ellipsis overflow-hidden whitespace-nowrap ${inputClassName} pr-8 block cursor-pointer`}
            onClick={handleCopy}
          >
            {value}
          </span>
          {isHovered && (
            <CopyIcon
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
              onClick={handleCopy}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default InputWithLabel;
