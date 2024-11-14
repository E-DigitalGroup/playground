// src/utils/pathUtils.ts

import path from 'path';

/**
 * Determines the base path of the application.
 * - If running as a pkg executable, uses the directory of the executable.
 * - Otherwise, uses the project's root directory.
 *
 * @returns {string} - The base path.
 */
export const getBasePath = (): string => {
  if ((process as any).pkg) {
    console.log('Running as a packaged executable.');
    // When running as a pkg executable
    return path.dirname(process.execPath);
  } else {
    console.log('Running in development mode.');
    // When running in development
    return path.resolve(__dirname, '..', '../');
  }
};
