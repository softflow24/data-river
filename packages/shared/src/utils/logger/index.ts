import chalk from "chalk";

type LogLevel = "debug" | "info" | "warn" | "error" | "none";

const LOG_LEVEL: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

const LOG_PRIORITIES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  none: 4,
  // Start of Selection
};

const LOG_COLORS: Record<LogLevel, chalk.Chalk> = {
  debug: chalk.cyan,
  info: chalk.green,
  warn: chalk.yellow,
  error: chalk.red,
  none: chalk.white,
};

const shouldLog = (level: LogLevel): boolean => {
  return LOG_PRIORITIES[level] >= LOG_PRIORITIES[LOG_LEVEL];
};

const formatMessage = (level: LogLevel, message: string): string => {
  const color = LOG_COLORS[level];
  return color(`[${level.toUpperCase()}] ${message}`);
};

export const logger = {
  debug: (message: string, data?: unknown) => {
    if (shouldLog("debug")) {
      console.log(formatMessage("debug", message));
      if (data !== undefined) {
        console.log(chalk.cyan(JSON.stringify(data, null, 2)));
      }
    }
  },
  info: (message: string, data?: unknown) => {
    if (shouldLog("info")) {
      console.info(formatMessage("info", message));
      if (data !== undefined) {
        console.info(chalk.green(JSON.stringify(data, null, 2)));
      }
    }
  },
  warn: (message: string, data?: unknown) => {
    if (shouldLog("warn")) {
      console.warn(formatMessage("warn", message));
      if (data !== undefined) {
        console.warn(chalk.yellow(JSON.stringify(data, null, 2)));
      }
    }
  },
  error: (message: string, error?: unknown) => {
    if (shouldLog("error")) {
      console.error(formatMessage("error", message));
      if (error instanceof Error) {
        console.error(chalk.red(error.stack));
      } else if (error !== undefined) {
        console.error(chalk.red(JSON.stringify(error, null, 2)));
      }
    }
  },
  table: (data: unknown[], columns?: string[]) => {
    if (shouldLog("debug")) {
      console.table(chalk.cyan(JSON.stringify(data)), columns);
    }
  },
  group: (label: string) => {
    if (shouldLog("debug")) {
      console.group(chalk.magenta(label));
    }
  },
  groupEnd: () => {
    if (shouldLog("debug")) {
      console.groupEnd();
    }
  },
  time: (label: string) => {
    if (shouldLog("debug")) {
      console.time(chalk.magenta(label));
    }
  },
  timeEnd: (label: string) => {
    if (shouldLog("debug")) {
      console.timeEnd(chalk.magenta(label));
    }
  },
};

export default logger;
