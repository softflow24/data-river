import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactFlow } from "reactflow";

import {
  RootState,
  zoomIn,
  zoomOut,
  addNewNode,
  toggleMinimalistic,
} from "../../store";

import MiniMapZoomControls from "./MiniMapZoomControls";
import UndoRedoControls from "./UndoRedoControls";
import ActionToolsControls from "./ActionToolsControls";

const Controls: FC = () => {
  const dispatch = useDispatch();
  const viewport = useSelector((state: RootState) => state.app.viewport);
  const { setViewport } = useReactFlow();

  function onZoomIn() {
    const zoom = Math.min(viewport.zoom + 0.1, 3);
    dispatch(zoomIn());
    setViewport({ ...viewport, zoom: zoom });
  }

  function onZoomOut() {
    const zoom = Math.max(viewport.zoom - 0.1, 0.5);
    dispatch(zoomOut());
    setViewport({ ...viewport, zoom: zoom });
  }

  return (
    <div
      style={{ bottom: "12px", zIndex: 6, position: "absolute" }}
      className="flex flex-row bg-transparent mb-2"
    >
      <MiniMapZoomControls
        zoomOut={onZoomOut}
        zoomIn={onZoomIn}
        zoom={viewport.zoom}
      />
      <UndoRedoControls />
      <ActionToolsControls
        addNewNode={() => dispatch(addNewNode())}
        toggleMinimalist={() => dispatch(toggleMinimalistic())}
      />
    </div>
  );
};

export default Controls;
