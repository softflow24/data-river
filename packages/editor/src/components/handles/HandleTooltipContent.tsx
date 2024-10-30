import { EqualNot, OctagonAlert } from "lucide-react";
import { TooltipContent } from "@data-river/shared/ui";

interface HandleTooltipContentProps {
  type: "input" | "output";
  typeMatch: boolean;
  handleTypes: string | string[];
  connectingHandlePropertyType?: string | string[];
}

const HandleTypesList: React.FC<{
  handleTypes: string | string[];
  className?: string;
}> = ({ handleTypes, className = "" }) => {
  if (typeof handleTypes === "string") {
    return <span className={`capitalize ${className}`}>{handleTypes}</span>;
  }

  return (
    <div className="flex flex-col">
      {handleTypes.map((type) => (
        <span className={`capitalize ${className}`} key={type}>
          {type}
        </span>
      ))}
    </div>
  );
};

export const HandleTooltipContent: React.FC<HandleTooltipContentProps> = ({
  type,
  typeMatch,
  handleTypes,
  connectingHandlePropertyType,
}) => {
  const showMismatch =
    type === "input" && !typeMatch && connectingHandlePropertyType;

  return (
    <TooltipContent side={type === "input" ? "left" : "right"} sideOffset={40}>
      <div className="flex flex-col gap-2">
        {showMismatch && (
          <div className="flex justify-between text-warning text-sm">
            <span>Type mismatch</span>
            <OctagonAlert className="w-4 h-4" />
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <HandleTypesList handleTypes={handleTypes} />
          </div>
          {showMismatch && (
            <>
              <div className="flex items-center gap-1">
                <span className="text-warning">
                  <EqualNot className="w-4 h-4" strokeWidth={2.5} />
                </span>
              </div>
              <div className="flex items-center">
                <HandleTypesList
                  handleTypes={connectingHandlePropertyType}
                  className="text-warning"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </TooltipContent>
  );
};
