// src/utils/logger.ts

/**
 * Logger Utility Module
 * 
 * This module provides a simple logging utility for the application, ensuring
 * consistent and structured logging of informational messages and errors. 
 * It can be easily extended or replaced with more sophisticated logging 
 * libraries like `winston` or `pino` if advanced features are required.
 */

 /**
  * Logger Class
  * 
  * The `Logger` class encapsulates methods for logging informational messages
  * and error messages. It standardizes the log output format and provides a 
  * centralized way to handle logging across the entire application.
  */
 class Logger {
    /**
     * Logs informational messages to the console.
     * 
     * This method prefixes messages with `[INFO]:` to clearly indicate the 
     * nature of the log. It accepts an optional data parameter that can be used 
     * to log additional contextual information alongside the message.
     * 
     * @param {string} message - The informational message to log.
     * @param {any} [data] - Optional additional data to log alongside the message.
     * 
     * @example
     * ```typescript
     * logger.info('User successfully created', { userId: 12345 });
     * ```
     */
    info(message: string, data?: any): void {
        if (data) {
            console.log(`[INFO]: ${message}`, data);
        } else {
            console.log(`[INFO]: ${message}`);
        }
    }

    /**
     * Logs error messages to the console.
     * 
     * This method prefixes messages with `[ERROR]:` to clearly indicate the 
     * nature of the log. It accepts an optional data parameter that can be used 
     * to log additional error details alongside the message.
     * 
     * @param {string} message - The error message to log.
     * @param {any} [data] - Optional additional error data to log alongside the message.
     * 
     * @example
     * ```typescript
     * logger.error('Failed to create user', { errorCode: 'USER_CREATION_FAILED' });
     * ```
     */
    error(message: string, data?: any): void {
        if (data) {
            console.error(`[ERROR]: ${message}`, data);
        } else {
            console.error(`[ERROR]: ${message}`);
        }
    }

    /**
     * Logs warning messages to the console.
     * 
     * This method prefixes messages with `[WARN]:` to indicate a warning. It accepts 
     * an optional data parameter for additional contextual information.
     * 
     * @param {string} message - The warning message to log.
     * @param {any} [data] - Optional additional data to log alongside the message.
     * 
     * @example
     * ```typescript
     * logger.warn('User login attempt failed', { userId: 12345 });
     * ```
     */
    warn(message: string, data?: any): void {
        if (data) {
            console.warn(`[WARN]: ${message}`, data);
        } else {
            console.warn(`[WARN]: ${message}`);
        }
    }

    /**
     * Logs debug messages to the console.
     * 
     * This method prefixes messages with `[DEBUG]:` to indicate a debug-level log.
     * It accepts an optional data parameter for detailed debugging information.
     * 
     * @param {string} message - The debug message to log.
     * @param {any} [data] - Optional additional debug data to log alongside the message.
     * 
     * @example
     * ```typescript
     * logger.debug('Fetching user data', { userId: 12345, retries: 3 });
     * ```
     */
    debug(message: string, data?: any): void {
        if (data) {
            console.debug(`[DEBUG]: ${message}`, data);
        } else {
            console.debug(`[DEBUG]: ${message}`);
        }
    }
}

/**
 * Export an instance of the Logger class.
 * 
 * By exporting a single instance, we ensure that the same logger is used
 * throughout the application, maintaining consistency in log formatting
 * and behavior.
 */
export default new Logger();
