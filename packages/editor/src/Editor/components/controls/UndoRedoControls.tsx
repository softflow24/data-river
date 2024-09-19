import { FC } from "react";
import { Undo, Redo } from "lucide-react";

import ControlButton from "./ControlButton";

const UndoRedoControls: FC = () => {
  return (
    <div className="mr-2 flex items-center bg-white p-2 rounded-lg shadow-md">
      <ControlButton onClick={() => console.log("undo")}>
        <Undo size={20} />
      </ControlButton>
      <ControlButton onClick={() => console.log("redo")}>
        <Redo size={20} />
      </ControlButton>
    </div>
  );
};

export default UndoRedoControls;
