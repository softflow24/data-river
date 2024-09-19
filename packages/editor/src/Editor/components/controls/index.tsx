import { FC } from "react";

import MiniMapZoomControls from "./MiniMapZoomControls";
import UndoRedoControls from "./UndoRedoControls";
import ActionToolsControls from "./ActionToolsControls";

interface ControlsProps {
  zoomOut: () => void;
  zoomIn: () => void;
  getZoom: () => number;
  addNewNode: () => void;
  toggleMinimalist: () => void;
}

const Controls: FC<ControlsProps> = ({
  zoomOut,
  zoomIn,
  getZoom,
  addNewNode,
  toggleMinimalist,
}) => {
  return (
    <div
      style={{ bottom: "12px", zIndex: 6, position: "absolute" }}
      className="flex flex-row bg-transparent mb-2"
    >
      <MiniMapZoomControls
        zoomOut={zoomOut}
        zoomIn={zoomIn}
        getZoom={getZoom}
      />
      <UndoRedoControls />
      <ActionToolsControls
        addNewNode={addNewNode}
        toggleMinimalist={toggleMinimalist}
      />
    </div>
  );
};

export default Controls;
