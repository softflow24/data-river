import { Button } from "@data-river/shared/ui/components/ui/button";
import RunWorkflowButton from "./RunWorkflowButton";
import { Eye, TableProperties, Terminal } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  toggleRightPanelVisible,
  toggleBottomPanelVisible,
  toggleIsCustomNodeInfoVisible,
} from "@/store";

const TopRightControls = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center gap-1 h-full">
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          dispatch(toggleRightPanelVisible());
        }}
      >
        <TableProperties className="w-5 h-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          dispatch(toggleIsCustomNodeInfoVisible());
        }}
      >
        <Eye className="w-5 h-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          dispatch(toggleBottomPanelVisible());
        }}
      >
        <Terminal className="w-5 h-5" />
      </Button>
      <RunWorkflowButton />
    </div>
  );
};

export default TopRightControls;
