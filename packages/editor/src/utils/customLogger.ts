import { ILogger } from "@data-river/shared/interfaces/ILogger";
import { addLog } from "../slices/executionSlice";
import store from "../store";
import { injectable } from "tsyringe";
import { LogLevel } from "@data-river/shared/interfaces/LogEntry";

function serializeData(data: unknown): any {
  if (data instanceof Error) {
    return {
      name: data.name,
      message: data.message,
      stack: data.stack,
      ...(data as any),
    };
  } else if (typeof data === "object" && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = serializeData((data as any)[key]);
      return acc;
    }, {} as any);
  }
  return data;
}

@injectable()
export class CustomLogger implements ILogger {
  private currentGroup: string | null = null;
  private timers: Record<string, number> = {};

  group(message: string): void {
    this.currentGroup = message; // Set the current group
    store.dispatch(
      addLog({
        level: "group",
        content: message,
        timestamp: new Date().toISOString(),
        group: message, // Group identifier for React to collapse
        isGroup: true, // Flag to indicate it's a group
      }),
    );
  }

  groupEnd(): void {
    if (this.currentGroup) {
      store.dispatch(
        addLog({
          level: "groupEnd",
          content: `End of ${this.currentGroup}`,
          timestamp: new Date().toISOString(),
          group: this.currentGroup, // Indicate the group this belongs to
          isGroup: false, // Group end
        }),
      );
      this.currentGroup = null; // Reset the current group
    }
  }

  time(message: string): void {
    // Only start a new timer if one doesn't already exist
    if (this.timers[message]) {
      this.logMessage("warn", `${message}: timer already running`);
      return; // Prevent overriding the existing timer
    }
    this.timers[message] = performance.now();
    this.logMessage("info", `${message}: timer started`);
  }

  timeEnd(message: string): void {
    if (this.timers[message]) {
      const duration = performance.now() - this.timers[message];
      this.logMessage("time", `${message}: ${duration.toFixed(2)}ms`);
      delete this.timers[message]; // Properly clean up after logging
    } else {
      this.logMessage("time", `${message}: timer does not exist`);
    }
  }

  debug(message: string, data?: unknown): void {
    this.logMessage("debug", message, data);
  }

  info(message: string, data?: unknown): void {
    this.logMessage("info", message, data);
  }

  warn(message: string, data?: unknown): void {
    this.logMessage("warn", message, data);
  }

  error(message: string, error?: unknown): void {
    this.logMessage("error", message, error);
  }

  private logMessage(level: LogLevel, message: string, data?: unknown): void {
    const group = this.currentGroup ? this.currentGroup : undefined;

    // Serialize the data before dispatching
    const serializedData = data ? serializeData(data) : undefined;

    store.dispatch(
      addLog({
        level: level,
        content: message,
        data: serializedData,
        timestamp: new Date().toISOString(),
        group: group, // Associate the log with the current group (if any)
        isGroup: false,
      }),
    );
  }
}

export const customLogger = new CustomLogger();
