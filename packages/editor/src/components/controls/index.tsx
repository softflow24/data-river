import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useReactFlow } from "reactflow";

import { AppDispatch } from "@store";
import { useReactFlowState } from "@hooks/useReactFlowState";
import { toggleMinimalistic } from "@slices/reactFlowSlice";

import MiniMapZoomControls from "./MiniMapZoomControls";
import UndoRedoControls from "./UndoRedoControls";
import ActionToolsControls from "./ActionToolsControls";

const Controls: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { viewport } = useReactFlowState((state) => ({
    viewport: state.viewport,
  }));
  const { setViewport: setReactFlowViewport } = useReactFlow();

  //! Don't set viewport in redux store, it's handled by listening to reactFlow's viewport changes.
  const onZoomIn = useCallback(() => {
    const zoom = Math.min(viewport.zoom + 0.1, 3);
    setReactFlowViewport({ ...viewport, zoom });
  }, [viewport, setReactFlowViewport]);

  const onZoomOut = useCallback(() => {
    const zoom = Math.max(viewport.zoom - 0.1, 0.5);
    setReactFlowViewport({ ...viewport, zoom });
  }, [viewport, setReactFlowViewport]);

  const onResetZoom = useCallback(() => {
    setReactFlowViewport({ ...viewport, zoom: 1 });
  }, [viewport, setReactFlowViewport]);

  function addNewNode() {
    // Implement this function in the reactFlowSlice if needed
    // For now, we'll just log a message
    console.log("Add new node functionality not implemented yet");
  }

  return (
    <div
      style={{ bottom: "12px", zIndex: 6, position: "absolute" }}
      className="flex flex-row bg-transparent mb-2"
    >
      <MiniMapZoomControls
        zoomOut={onZoomOut}
        zoomIn={onZoomIn}
        resetZoom={onResetZoom}
        zoom={viewport.zoom}
      />
      <UndoRedoControls />
      <ActionToolsControls
        addNewNode={addNewNode}
        toggleMinimalist={() => dispatch(toggleMinimalistic())}
      />
    </div>
  );
};

export default Controls;
