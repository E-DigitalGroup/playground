/**
 * A simple logger utility for logging informational and error messages.
 * This utility helps standardize log output with consistent prefixes for easier debugging.
 */
export const logger = {
    /**
     * Logs informational messages to the console.
     *
     * @param args - The messages or data to log as informational output.
     * Example: `logger.info('Server started on port', 8080);`
     * Output: [INFO] Server started on port 8080
     */
    info: (...args: any[]) => {
      console.log('[INFO]', ...args);
    },
  
    /**
     * Logs error messages to the console.
     *
     * @param args - The messages or data to log as error output.
     * Example: `logger.error('Failed to connect to database', err);`
     * Output: [ERROR] Failed to connect to database Error: Connection refused
     */
    error: (...args: any[]) => {
      console.error('[ERROR]', ...args);
    },
  };
  