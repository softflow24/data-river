import chalk from "chalk";
import { ILogger } from "../../interfaces/ILogger";
import { LogLevel } from "../../interfaces/LogEntry";

export const LOG_PRIORITIES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  none: 4,
  group: 4,
  groupEnd: 4,
  time: 1,
  timeEnd: 1,
};

const LOG_COLORS: Record<LogLevel, (str: string) => string> = {
  debug: (str) => (typeof chalk !== "undefined" ? chalk.cyan(str) : str),
  info: (str) => (typeof chalk !== "undefined" ? chalk.green(str) : str),
  warn: (str) => (typeof chalk !== "undefined" ? chalk.yellow(str) : str),
  error: (str) => (typeof chalk !== "undefined" ? chalk.red(str) : str),
  none: (str) => (typeof chalk !== "undefined" ? chalk.white(str) : str),
  group: (str) => (typeof chalk !== "undefined" ? chalk.blue(str) : str),
  groupEnd: (str) => (typeof chalk !== "undefined" ? chalk.blue(str) : str),
  time: (str) => (typeof chalk !== "undefined" ? chalk.blue(str) : str),
  timeEnd: (str) => (typeof chalk !== "undefined" ? chalk.blue(str) : str),
};

export default class DefaultLogger implements ILogger {
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = "info") {
    this.logLevel = logLevel;
  }

  group(message: string): void {
    if (this.shouldLog("info")) {
      console.group(chalk.bold(message)); // Using console.group for grouping
    }
  }

  groupEnd(): void {
    console.groupEnd(); // Ends the console group
  }

  time(message: string): void {
    console.time(message); // Starts a timer
  }

  timeEnd(message: string): void {
    console.timeEnd(message); // Ends the timer and logs the result
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_PRIORITIES[level] >= LOG_PRIORITIES[this.logLevel];
  }

  private formatMessage(level: LogLevel, message: string): string {
    const colorFunc = LOG_COLORS[level];
    return colorFunc(`[${level.toUpperCase()}] ${message}`);
  }

  debug(message: string, data?: unknown): void {
    if (this.shouldLog("debug")) {
      console.log(this.formatMessage("debug", message));
      if (data !== undefined) {
        console.log(chalk.cyan(JSON.stringify(data, null, 2)));
      }
    }
  }

  info(message: string, data?: unknown): void {
    if (this.shouldLog("info")) {
      console.info(this.formatMessage("info", message));
      if (data !== undefined) {
        console.info(chalk.green(JSON.stringify(data, null, 2)));
      }
    }
  }

  warn(message: string, data?: unknown): void {
    if (this.shouldLog("warn")) {
      console.warn(this.formatMessage("warn", message));
      if (data !== undefined) {
        console.warn(chalk.yellow(JSON.stringify(data, null, 2)));
      }
    }
  }

  error(message: string, error?: unknown): void {
    if (this.shouldLog("error")) {
      console.error(this.formatMessage("error", message));
      if (error instanceof Error) {
        console.error(chalk.red(error.stack));
      } else if (error !== undefined) {
        console.error(chalk.red(JSON.stringify(error, null, 2)));
      }
    }
  }
}

export const defaultLogger = new DefaultLogger();
