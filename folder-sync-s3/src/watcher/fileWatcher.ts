// src/watcher/fileWatcher.ts

import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import logger from '../utils/logger';
import config from '../config';

/**
 * Initializes the file watcher to monitor the specified directory and folder.
 *
 * @param {Function} onAdd - Callback function when a file is added.
 * @param {Function} onUnlink - Callback function when a file is removed.
 * @returns {FSWatcher} - The initialized file watcher.
 */
const initWatcher = (onAdd: (filePath: string) => void, onUnlink: (filePath: string) => void): FSWatcher => {
  const ignoredPatterns: RegExp[] = [/(^|[\/\\])\../]; // Ignore hidden files

  const watcher: FSWatcher = chokidar.watch(path.join(config.DIRECTORY, config.FOLDER), {
    ignored: ignoredPatterns,
    persistent: true,
  });

  watcher
    .on('add', onAdd)
    .on('unlink', onUnlink)
    .on('error', (error: Error) => logger.error(`Watcher error: ${error.message}`))
    .on('ready', () => logger.info('File watcher initialized and ready.'));

  return watcher;
};

export default initWatcher;
