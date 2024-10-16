import { FC } from "react";
import { ZoomOut, ZoomIn } from "lucide-react";
import Minimap from "./minimap";

import { Button } from "@data-river/shared/ui/components/ui/button";

interface MiniMapZoomControlsProps {
  zoomOut: () => void;
  zoomIn: () => void;
  resetZoom: () => void;
  zoom: number;
}

const MiniMapZoomControls: FC<MiniMapZoomControlsProps> = ({
  zoomOut,
  zoomIn,
  zoom,
  resetZoom,
}) => {
  return (
    <div className="mx-2 flex flex-col items-center bg-background border rounded-lg shadow-md relative justify-center p-2">
      <Minimap />

      <div className="flex items-center justify-between w-full">
        <Button variant="ghost" size="icon" onClick={zoomOut}>
          <ZoomOut className="h-1/2 w-1/2" />
        </Button>
        <Button
          variant="ghost"
          className="select-none w-14"
          onClick={resetZoom}
        >
          {Math.round(zoom * 100)}%
        </Button>
        <Button variant="ghost" size="icon" onClick={zoomIn}>
          <ZoomIn className="h-1/2 w-1/2" />
        </Button>
      </div>
    </div>
  );
};

export default MiniMapZoomControls;
