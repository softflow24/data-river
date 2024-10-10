import {
  TextCursorInput,
  Square,
  GitBranch,
  Plus,
  Play,
  Flag,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addNewNode } from "../../slices/reactFlowSlice";
import { NodeType } from "../../nodes";
import { useReactFlow } from "reactflow";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@data-river/shared/ui/components/ui/dropdown-menu";

interface AddBlockDropdownMenuProps {
  direction?: "up" | "down";
  children: React.ReactNode;
}

const nodeTypeIcons = {
  start: Play,
  input: TextCursorInput,
  logic: GitBranch,
  output: Square,
  end: Flag,
};

export function AddBlockDropdownMenu({
  direction = "down",
  children,
}: AddBlockDropdownMenuProps) {
  const dispatch = useDispatch();
  const { screenToFlowPosition } = useReactFlow();

  const handleAddNode = (
    event: React.MouseEvent<HTMLDivElement>,
    type: NodeType,
  ) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    dispatch(addNewNode({ type, position }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        side={direction === "up" ? "top" : "bottom"}
        align="start"
        sideOffset={12}
        alignOffset={-8}
      >
        <DropdownMenuLabel>Add Block to Flow</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TextCursorInput className="mr-2 h-4 w-4" />
              <span>Input</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={(event) => handleAddNode(event, "input")}
              >
                <TextCursorInput className="mr-2 h-4 w-4" />
                <span>Input Node</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(event) => handleAddNode(event, "input")}
              >
                <Square className="mr-2 h-4 w-4" />
                <span>Simple Input</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem onClick={(event) => handleAddNode(event, "logic")}>
            <GitBranch className="mr-2 h-4 w-4" />
            <span>Logic</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(event) => handleAddNode(event, "output")}>
            <Square className="mr-2 h-4 w-4" />
            <span>Output</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Custom Block</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
