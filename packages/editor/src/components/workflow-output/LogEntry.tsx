import React, { useState } from "react";
import { ChevronRight, ChevronDown, Copy } from "lucide-react";
import { LogLevel } from "@data-river/shared/interfaces/LogEntry";
import { LOG_PRIORITIES } from "@data-river/shared/utils/logger";
import { LogEntryStack } from ".";
import { toast } from "@data-river/shared/ui/hooks/use-toast";

const LOG_COLORS: Record<LogLevel, string> = {
  debug: "text-gray-500",
  info: "text-blue-500",
  warn: "text-yellow-500",
  error: "text-red-500",
  group: "text-gray-500",
  groupEnd: "text-gray-500",
  time: "text-gray-500",
  timeEnd: "text-gray-500",
  none: "text-gray-500",
};

interface LogEntryProps {
  log: LogEntryStack;
  depth: number;
  filterLevel: LogLevel;
  toggleGroup: (log: LogEntryStack) => void;
}

const renderLogData = (data: unknown): string => {
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data, null, 2);
  }
  return String(data);
};

export const LogEntry: React.FC<LogEntryProps> = ({
  log,
  depth,
  filterLevel,
  toggleGroup,
}) => {
  const [isDataExpanded, setIsDataExpanded] = useState(false);

  if (LOG_PRIORITIES[log.level] < LOG_PRIORITIES[filterLevel]) {
    return null;
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The log data has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className={`mb-1 ml-${depth * 4}`}>
      {log.children && log.children.length > 0 && (
        <button
          onClick={() => toggleGroup(log)}
          className="mr-1 focus:outline-none"
        >
          {log.expanded ? (
            <ChevronDown className="w-3 h-3 inline" />
          ) : (
            <ChevronRight className="w-3 h-3 inline" />
          )}
        </button>
      )}
      <span className="text-muted-foreground">
        [{new Date(log.timestamp).toLocaleTimeString()}]{" "}
      </span>
      <span className={`font-semibold ${LOG_COLORS[log.level]}`}>
        [{log.level.toUpperCase()}]{" "}
      </span>
      <span>{log.content}</span>
      {log.data !== undefined && (
        <div className="mt-1">
          <button
            onClick={() => setIsDataExpanded(!isDataExpanded)}
            className="text-xs text-blue-500 hover:underline"
          >
            {isDataExpanded ? "Hide" : "Show"} data
          </button>
          {isDataExpanded && (
            <div className="relative mt-1">
              <pre className="bg-black-950 text-white p-2 rounded-md text-xs whitespace-pre-wrap border">
                {renderLogData(log.data)}
              </pre>
              <button
                onClick={() => copyToClipboard(renderLogData(log.data))}
                className="absolute top-2 right-2 text-white hover:text-blue-300"
              >
                <Copy size={14} />
              </button>
            </div>
          )}
        </div>
      )}
      {log.expanded &&
        log.children &&
        log.children.map((child) => (
          <LogEntry
            key={`${child.timestamp}-${child.content.slice(0, 10)}`}
            log={child}
            depth={depth + 1}
            filterLevel={filterLevel}
            toggleGroup={toggleGroup}
          />
        ))}
    </div>
  );
};
