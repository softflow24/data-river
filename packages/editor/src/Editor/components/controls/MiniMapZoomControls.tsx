import { FC } from "react";
import { ZoomOut, ZoomIn } from "lucide-react";
import { MiniMap } from "reactflow";

import ControlButton from "./ControlButton";

interface MiniMapZoomControlsProps {
  zoomOut: () => void;
  zoomIn: () => void;
  getZoom: () => number;
}

const MiniMapZoomControls: FC<MiniMapZoomControlsProps> = ({
  zoomOut,
  zoomIn,
  getZoom,
}) => {
  return (
    <div className="mr-2 flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
      <MiniMap
        style={{ position: "absolute", margin: 0, marginBottom: "60px" }}
        position="bottom-left"
        pannable
        zoomable
      />
      <div className="mt-2 flex items-center justify-between w-auto">
        <ControlButton onClick={zoomOut}>
          <ZoomOut size={20} />
        </ControlButton>
        <span className="mx-2 text-sm font-medium text-gray-500">
          {Math.round(getZoom() * 100)}%
        </span>
        <ControlButton onClick={zoomIn}>
          <ZoomIn size={20} />
        </ControlButton>
      </div>
    </div>
  );
};

export default MiniMapZoomControls;
