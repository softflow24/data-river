import { FC } from "react";
import { PlusCircle, MousePointer, Hand, LayoutGrid } from "lucide-react";

import ControlButton from "./ControlButton";
import ControlSeparator from "./ControlSeparator";

interface ActionToolsControlsProps {
  addNewNode: () => void;
  toggleMinimalist: () => void;
}

const ActionToolsControls: FC<ActionToolsControlsProps> = ({
  addNewNode,
  toggleMinimalist,
}) => {
  return (
    <div className="flex items-center bg-white p-2 rounded-lg shadow-md">
      <ControlButton onClick={addNewNode}>
        <PlusCircle size={20} />
      </ControlButton>

      <ControlSeparator />

      <ControlButton onClick={() => alert("Not implemented")}>
        <MousePointer size={20} />
      </ControlButton>

      <ControlSeparator />

      <ControlButton onClick={() => alert("Not implemented")} active={true}>
        <Hand size={20} />
      </ControlButton>

      <ControlSeparator />

      <ControlButton onClick={toggleMinimalist}>
        <LayoutGrid size={20} />
      </ControlButton>
    </div>
  );
};

export default ActionToolsControls;
