import { FC } from "react";
import { Undo, Redo } from "lucide-react";

import ControlButton from "./ControlButton";

const UndoRedoControls: FC = () => {
  // TODO: Implement undo and redo
  // github.com/xplato/useUndoable
  // https://www.npmjs.com/package/use-undoable

  return (
    <div className="mr-2 flex items-center bg-white p-2 rounded-lg shadow-md">
      <ControlButton
        onClick={() =>
          alert(
            "not implemented, read UndoRedoControls to find resources to implement",
          )
        }
      >
        <Undo size={20} />
      </ControlButton>
      <ControlButton
        onClick={() =>
          alert(
            "not implemented, read UndoRedoControls to find resources to implement",
          )
        }
      >
        <Redo size={20} />
      </ControlButton>
    </div>
  );
};

export default UndoRedoControls;
