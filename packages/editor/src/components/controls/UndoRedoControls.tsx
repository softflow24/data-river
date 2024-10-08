import { FC } from "react";
import { Undo, Redo } from "lucide-react";

import { Button } from "@data-river/shared/ui/components/ui/button";
import { Separator } from "@data-river/shared/ui/components/ui/separator";

const UndoRedoControls: FC = () => {
  // TODO: Implement undo and redo
  // github.com/xplato/useUndoable
  // https://www.npmjs.com/package/use-undoable

  return (
    <div className="mr-2 flex items-center bg-background border p-2 rounded-lg shadow-md space-x-1.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          alert(
            "not implemented, read UndoRedoControls to find resources to implement",
          )
        }
      >
        <Undo className="h-1/2 w-1/2" />
      </Button>

      <Separator orientation="vertical" />

      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          alert(
            "not implemented, read UndoRedoControls to find resources to implement",
          )
        }
      >
        <Redo className="h-1/2 w-1/2" />
      </Button>
    </div>
  );
};

export default UndoRedoControls;
