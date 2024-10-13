import React from "react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { startDraggingNode } from "../../slices/reactFlowSlice";
import { blockConfigs, BlockType } from "../../blocks";
import { useReactFlow } from "reactflow";
import NodeIcon from "../NodeIcon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@data-river/shared/ui/components/ui/dropdown-menu";

interface AddBlockDropdownMenuProps {
  direction?: "up" | "down";
  children: React.ReactNode;
}

export function AddBlockDropdownMenu({
  direction = "down",
  children,
}: AddBlockDropdownMenuProps) {
  const dispatch = useDispatch();
  const { screenToFlowPosition } = useReactFlow();

  const handleStartDraggingNode = (
    event: React.MouseEvent<HTMLDivElement>,
    type: BlockType,
  ) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    dispatch(startDraggingNode({ type, position }));
  };

  const renderMenuItems = () => {
    return Object.entries(blockConfigs)
      .filter(([_, config]) => config.data?.addable ?? true)
      .map(([type, config]) => (
        <DropdownMenuItem
          key={type}
          onClick={(event) => handleStartDraggingNode(event, type as BlockType)}
        >
          <NodeIcon
            icon={config.data!.icon}
            color={config.data!.color}
            useBackgroundColor={false}
            useIconColor={false}
          />
          <span className="ml-2">{config.data!.label}</span>
        </DropdownMenuItem>
      ));
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
        <DropdownMenuGroup>{renderMenuItems()}</DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Plus className="mr-2 h-4 w-4" />
          <span>Add Custom Block</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
