import { FC } from "react";
import { PlusCircle, MousePointer, Hand } from "lucide-react";
import { Separator } from "@data-river/shared/ui/components/ui/separator";

import { Button } from "@data-river/shared/ui/components/ui/button";
import { AddBlockDropdownMenu } from "./AddBlockDropdown";

interface ActionToolsControlsProps {
  addNewNode: () => void;
  toggleMinimalist: () => void;
}

const ActionToolsControls: FC<ActionToolsControlsProps> = ({ addNewNode }) => {
  return (
    <div className="flex items-center bg-background border p-2 rounded-lg shadow-md space-x-1.5">
      <AddBlockDropdownMenu>
        <Button variant="ghost" size="icon" onClick={addNewNode}>
          <PlusCircle className="h-1/2 w-1/2" />
        </Button>
      </AddBlockDropdownMenu>

      <Separator orientation="vertical" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => alert("Not implemented")}
      >
        <MousePointer className="h-1/2 w-1/2" />
      </Button>

      <Separator orientation="vertical" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => alert("Not implemented")}
        className="text-focus-foreground bg-focus/60 hover:bg-focus/100"
      >
        <Hand className="h-1/2 w-1/2" />
      </Button>
    </div>
  );
};

export default ActionToolsControls;
