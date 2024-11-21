// src/utilities/logger.ts

import { createLogger, format, transports, Logger } from 'winston';
import path from 'path';
import fs from 'fs';

/**
 * Directory where log files will be stored.
 */
const logDir = 'logs';

/**
 * Ensure that the log directory exists.
 */
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Configuration for the logger.
 * Adjust the log levels and formats as needed.
 */
const logger: Logger = createLogger({
  level: 'info', // Default log level
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }), // Include stack trace in error logs
    format.splat(), // Support string interpolation
    format.json() // Log in JSON format
  ),
  defaultMeta: { service: 'youtube-transcript-search' }, // Default metadata
  transports: [
    // Console transport for development
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize the output
        format.simple() // Simple format for readability
      ),
    }),
    // File transport for error logs
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
    }),
    // File transport for combined logs
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
    }),
  ],
});

/**
 * If the application is not in production, also log to the console
 * with the colorized simple format.
 */
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
    })
  );
}

/**
 * Export the logger instance to be used throughout the application.
 */
export default logger;
