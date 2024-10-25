import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Textarea,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Badge,
  cn,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@data-river/shared/ui";
import { useTokenCount } from "./useTokenCount";
import AnimatedSparkle from "./AnimatedSparkle";
import { User, Bot, UserRoundCog, Trash } from "lucide-react";

type MessageItemProps = {
  message: {
    role: "system" | "user" | "assistant";
    content: string;
  };
  index: number;
  onChangeRole: (index: number, role: "system" | "user" | "assistant") => void;
  onRemove: (index: number) => void;
  onChange: (index: number, key: "role" | "content", value: string) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  index,
  onChangeRole,
  onRemove,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(message.content);
  const tokenCount = useTokenCount(localContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [animate, setAnimate] = useState(false);
  const prevTokenCount = useRef(tokenCount);

  useEffect(() => {
    setLocalContent(message.content);
  }, [message.content]);

  useEffect(() => {
    if (prevTokenCount.current !== tokenCount) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300);
      prevTokenCount.current = tokenCount;
      return () => clearTimeout(timer);
    }
  }, [tokenCount]);

  const roleIcons = {
    user: <User className="w-5 h-5" />,
    assistant: <Bot className="w-5 h-5" />,
    system: <UserRoundCog className="w-5 h-5" />,
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleStopEditing = () => {
    setIsEditing(false);
    if (localContent !== message.content) {
      onChange(index, "content", localContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleStopEditing();
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        isEditing && "border-primary",
      )}
    >
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center space-x-2"
              >
                {roleIcons[message.role]}
                <span className="capitalize">{message.role}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onChangeRole(index, "system")}>
                <UserRoundCog className="w-4 h-4 mr-2" />
                System
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChangeRole(index, "user")}>
                <User className="w-4 h-4 mr-2" />
                User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onChangeRole(index, "assistant")}
              >
                <Bot className="w-4 h-4 mr-2" />
                Assistant
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-2 h-full">
          <Badge variant="outline" className="h-6 px-2 py-0 flex items-center">
            <AnimatedSparkle animate={animate} className="mr-1" />
            <span className={cn("ml-1", animate && "animate-blink")}>
              {tokenCount}
            </span>
          </Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onRemove(index)}
                className="hover:bg-destructive/70 h-6 w-6 p-1"
              >
                <Trash className="w-full h-full" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove message</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Textarea
        ref={textareaRef}
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        onBlur={handleStopEditing}
        onKeyDown={handleKeyDown}
        onFocus={handleStartEditing}
        placeholder={`Enter ${message.role} message`}
        rows={3}
        className="w-full resize-none bg-transparent border-none focus:ring-0 focus-visible:ring-0"
      />
    </div>
  );
};

export default MessageItem;
