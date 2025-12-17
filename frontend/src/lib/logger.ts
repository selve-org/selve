/**
 * Production Logger for Next.js
 * - Console logging in development
 * - PII scrubbing for all logs
 * - Server-side logging via Sentry in production
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  userId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  [key: string]: any;
}

class Logger {
  private isProduction = process.env.NODE_ENV === "production";
  private isServer = typeof window === "undefined";

  /**
   * Scrub PII from log messages
   */
  private scrubPII(message: string): string {
    if (typeof message !== "string") return message;

    // Email scrubbing
    message = message.replace(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      "***@***.***"
    );

    // Financial amounts
    message = message.replace(/\$\d+\.\d+/g, "$X.XX");

    // Credit card numbers
    message = message.replace(
      /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
      "****-****-****-****"
    );

    // API keys and tokens (common patterns)
    message = message.replace(
      /(api[_-]?key|token|secret)[:\s=]+[\w-]{20,}/gi,
      "$1=***REDACTED***"
    );

    return message;
  }

  /**
   * Scrub PII from context object
   */
  private scrubContext(context?: LogContext): LogContext | undefined {
    if (!context) return undefined;

    const scrubbed = { ...context };

    // Truncate user IDs
    if (scrubbed.userId && typeof scrubbed.userId === "string") {
      scrubbed.userId =
        scrubbed.userId.substring(0, 8) +
        (scrubbed.userId.length > 8 ? "***" : "");
    }

    // Remove sensitive fields
    delete scrubbed.email;
    delete scrubbed.password;
    delete scrubbed.creditCard;

    return scrubbed;
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    const scrubbedMessage = this.scrubPII(message);
    const scrubbedContext = this.scrubContext(context);
    const timestamp = new Date().toISOString();

    const logData = {
      timestamp,
      level,
      message: scrubbedMessage,
      ...scrubbedContext,
    };

    // In production, Sentry will capture console.error and console.warn
    // So we just need to log to console and Sentry integration handles it
    switch (level) {
      case "debug":
        if (!this.isProduction) {
          console.debug(logData);
        }
        break;
      case "info":
        console.info(logData);
        break;
      case "warn":
        console.warn(logData);
        break;
      case "error":
        console.error(logData);
        break;
    }
  }

  /**
   * Debug level logging (development only)
   */
  debug(message: string, context?: LogContext) {
    this.log("debug", message, context);
  }

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext) {
    this.log("info", message, context);
  }

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext) {
    this.log("warn", message, context);
  }

  /**
   * Error level logging
   */
  error(message: string, context?: LogContext) {
    this.log("error", message, context);
  }

  /**
   * Log an exception with full stack trace
   */
  exception(error: Error, context?: LogContext) {
    this.log("error", `${error.name}: ${error.message}`, {
      ...context,
      stack: error.stack,
    });
  }
}

export const logger = new Logger();
