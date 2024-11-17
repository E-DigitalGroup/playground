// src/lib/utilities/logger.ts

/**
 * Logger Utility
 * 
 * This module provides a simple logging utility for the application. It includes methods
 * for logging informational messages and error messages to the console. The logger can
 * be expanded in the future to include more sophisticated logging features such as
 * different log levels, log formatting, and integration with external logging services.
 */

/**
 * Logger Object
 * 
 * Contains methods for logging informational and error messages.
 */
export const logger = {
    /**
     * Info Log
     * 
     * Logs informational messages to the console with an "INFO" prefix.
     * 
     * @param msg - The informational message to log.
     */
    info: (msg: string): void => {
      console.log(`INFO: ${msg}`);
    },
  
    /**
     * Error Log
     * 
     * Logs error messages to the console with an "ERROR" prefix.
     * 
     * @param msg - The error message to log.
     */
    error: (msg: string): void => {
      console.error(`ERROR: ${msg}`);
    },
  };
  