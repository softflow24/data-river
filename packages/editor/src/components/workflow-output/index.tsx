import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@data-river/shared/ui/components/ui/scroll-area";
import { LogEntry as LogEntryType } from "@data-river/shared/interfaces/LogEntry";
import { LogEntry } from "./LogEntry";
import useExecutionState from "@/hooks/useExecutionState";

export type LogEntryStack = LogEntryType & {
  children?: LogEntryType[];
  expanded?: boolean;
};

export function WorkflowOutputComponent() {
  const filterLevel = useExecutionState((x) => x.filterLevel);
  const logs = useExecutionState((x) => x.logs);
  const [groupedLogs, setGroupedLogs] = useState<LogEntryType[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const groupLogs = (logs: LogEntryType[]): LogEntryType[] => {
      const result: LogEntryType[] = [];
      const stack: LogEntryStack[] = [];

      logs.forEach((log) => {
        const groupedLog: LogEntryStack = {
          ...log,
          children: [],
          expanded: true,
        };

        if (log.level === "group") {
          if (stack.length > 0) {
            stack[stack.length - 1].children?.push(groupedLog);
          } else {
            result.push(groupedLog);
          }
          stack.push(groupedLog);
        } else if (log.level === "groupEnd") {
          stack.pop();
        } else {
          if (stack.length > 0) {
            stack[stack.length - 1].children?.push(groupedLog);
          } else {
            result.push(groupedLog);
          }
        }
      });

      return result;
    };

    setGroupedLogs(groupLogs(logs));
  }, [logs]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [groupedLogs]);

  const toggleGroup = (log: LogEntryType & { expanded?: boolean }) => {
    log.expanded = !log.expanded;
    setGroupedLogs([...groupedLogs]);
  };

  return (
    <div className="w-full h-full mx-auto overflow-hidden">
      <ScrollArea className="h-full p-4 font-mono text-sm" ref={scrollAreaRef}>
        {groupedLogs.map((log) => (
          <LogEntry
            key={`${log.timestamp}-${log.content.slice(0, 10)}`}
            log={log}
            depth={0}
            filterLevel={filterLevel}
            toggleGroup={toggleGroup}
          />
        ))}
        {groupedLogs.length === 0 && (
          <div className="text-muted-foreground italic">
            No logs yet. Execute a workflow to see results.
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
