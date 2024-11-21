// src/utils/logger.ts

/**
 * Enum representing the different levels of logging severity.
 */
export enum LogLevel {
    INFO = 'INFO',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
  }
  
  /**
   * Interface representing the structure of additional metadata
   * that can be included with log messages.
   */
  export interface LogMeta {
    [key: string]: unknown;
  }
  
  /**
   * Interface defining the structure of the Logger.
   * It includes methods for different log levels.
   */
  export interface Logger {
    /**
     * Logs an informational message.
     *
     * @param message - The message to log.
     * @param meta - Optional metadata to include with the log.
     */
    info(message: string, meta?: LogMeta): void;
  
    /**
     * Logs an error message.
     *
     * @param message - The error message to log.
     * @param meta - Optional metadata to include with the log.
     */
    error(message: string, meta?: LogMeta): void;
  
    /**
     * Logs a debug message.
     *
     * @param message - The debug message to log.
     * @param meta - Optional metadata to include with the log.
     */
    debug(message: string, meta?: LogMeta): void;
  }
  
  /**
   * Implementation of the Logger interface using console methods.
   * Each log method outputs a JSON string containing the log level,
   * message, and optional metadata.
   */
  export const logger: Logger = {
    /**
     * Logs an informational message.
     *
     * @param message - The message to log.
     * @param meta - Optional metadata to include with the log.
     */
    info: (message: string, meta?: LogMeta): void => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message,
        ...(meta && { meta }),
      };
      console.log(JSON.stringify(logEntry));
    },
  
    /**
     * Logs an error message.
     *
     * @param message - The error message to log.
     * @param meta - Optional metadata to include with the log.
     */
    error: (message: string, meta?: LogMeta): void => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.ERROR,
        message,
        ...(meta && { meta }),
      };
      console.error(JSON.stringify(logEntry));
    },
  
    /**
     * Logs a debug message.
     *
     * @param message - The debug message to log.
     * @param meta - Optional metadata to include with the log.
     */
    debug: (message: string, meta?: LogMeta): void => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.DEBUG,
        message,
        ...(meta && { meta }),
      };
      console.debug(JSON.stringify(logEntry));
    },
  };
  