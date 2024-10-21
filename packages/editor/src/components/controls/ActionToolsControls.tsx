import { FC } from "react";
import { PlusCircle } from "lucide-react";

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
    </div>
  );
};

export default ActionToolsControls;
