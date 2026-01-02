/**
 * Simple logging utility for the application
 * Does not change existing workflow - just adds structured logging
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: Error;
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, error } = entry;
  
  let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  
  if (context && Object.keys(context).length > 0) {
    logMessage += ` | Context: ${JSON.stringify(context)}`;
  }
  
  if (error) {
    logMessage += ` | Error: ${error.message}`;
    if (error.stack) {
      logMessage += ` | Stack: ${error.stack}`;
    }
  }
  
  return logMessage;
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    error,
  };

  const formattedMessage = formatLogEntry(entry);

  // Use appropriate console method based on level
  switch (level) {
    case "error":
      console.error(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "debug":
      // Only log debug in development
      if (process.env.NODE_ENV !== "production") {
        console.debug(formattedMessage);
      }
      break;
    default:
      console.log(formattedMessage);
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    log("info", message, context);
  },
  
  warn: (message: string, context?: Record<string, unknown>) => {
    log("warn", message, context);
  },
  
  error: (message: string, error?: Error, context?: Record<string, unknown>) => {
    log("error", message, context, error);
  },
  
  debug: (message: string, context?: Record<string, unknown>) => {
    log("debug", message, context);
  },
};

