export interface ILogger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, error?: unknown): void;
  group(message: string): void;
  groupEnd(): void;
  time(message: string): void;
  timeEnd(message: string): void;
}
