import { ResizableHandle } from "@data-river/shared/ui/components/ui/resizable";
import { cn } from "@data-river/shared/ui/utils";

interface BottomResizeHandleProps {
  isHovered: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onHoverChange: (hovered: boolean) => void;
}

export function BottomResizeHandle({
  isHovered,
  isDragging,
  onDragStart,
  onDragEnd,
  onHoverChange,
}: BottomResizeHandleProps) {
  return (
    <ResizableHandle
      className={cn(
        isHovered || isDragging ? "w-1 bg-blue-500" : "w-0",
        "transition-all duration-300",
      )}
      withHandle={isHovered || isDragging}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseOver={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      hitAreaMargins={{ coarse: 10, fine: 10 }}
    />
  );
}
