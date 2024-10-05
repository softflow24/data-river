import { Button } from "@data-river/shared/ui/components/ui/button";
import RunWorkflowButton from "./RunWorkflowButton";
import { Separator } from "@data-river/shared/ui/components/ui/separator";
import { TableProperties, Terminal } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleRightPanelVisible, toggleBottomPanelVisible } from "@/store";

const TopRightControls = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center">
      <Button
        size={"icon"}
        className="mr-2"
        onClick={() => {
          dispatch(toggleRightPanelVisible());
        }}
      >
        <TableProperties className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" />
      <Button
        size={"icon"}
        className="mr-2"
        onClick={() => {
          dispatch(toggleBottomPanelVisible());
        }}
      >
        <Terminal className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" />
      <RunWorkflowButton />
    </div>
  );
};

export default TopRightControls;
