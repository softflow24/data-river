export type LogLevel =
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "none"
  | "group"
  | "groupEnd"
  | "time"
  | "timeEnd";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  content: string;
  data?: unknown;
  group?: string;
  isGroup?: boolean;
}
