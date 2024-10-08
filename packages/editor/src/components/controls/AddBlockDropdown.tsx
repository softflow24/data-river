import { TextCursorInput, Square, GitBranch, Plus } from "lucide-react";

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

export function AddBlockDropdownMenu({
  direction = "down",
  children,
}: AddBlockDropdownMenuProps) {
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
              <TextCursorInput className="mr-2 h-4 w-4 " />
              <span>Input</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <TextCursorInput className="mr-2 h-4 w-4 " />
                <span>Input Node</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Square className="mr-2 h-4 w-4 " />
                <span>Simple Input</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <GitBranch className="mr-2 h-4 w-4 " />
            <span>Logic</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Square className="mr-2 h-4 w-4 " />
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
