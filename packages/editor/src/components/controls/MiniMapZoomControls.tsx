import { FC } from "react";
import { ZoomOut, ZoomIn } from "lucide-react";
import Minimap from "./minimap";

import ControlButton from "./ControlButton";

interface MiniMapZoomControlsProps {
  zoomOut: () => void;
  zoomIn: () => void;
  zoom: number;
}

const MiniMapZoomControls: FC<MiniMapZoomControlsProps> = ({
  zoomOut,
  zoomIn,
  zoom,
}) => {
  return (
    <div className="mr-2 flex flex-col items-center bg-white p-2 rounded-lg shadow-md">
      <Minimap />
      <div className="mt-2 flex items-center justify-between w-auto">
        <ControlButton onClick={zoomOut}>
          <ZoomOut size={20} />
        </ControlButton>
        <span className="mx-2 text-sm font-medium text-gray-500">
          {Math.round(zoom * 100)}%
        </span>
        <ControlButton onClick={zoomIn}>
          <ZoomIn size={20} />
        </ControlButton>
      </div>
    </div>
  );
};

export default MiniMapZoomControls;
