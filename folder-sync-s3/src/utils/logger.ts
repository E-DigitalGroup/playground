// src/utils/logger.ts

import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

/**
 * Configures the Winston logger with timestamp, formatting, and transports.
 */
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'MM/DD/YYYY HH:mm:ss',
    }),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} : ${level.toUpperCase()} : ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export default logger;
