// src/app.ts

import logger from './utils/logger';
import fs from 'fs';
import initWatcher from './watcher/fileWatcher';
import { createKey } from './utils/fileUtils';
import { checkExists, uploadFile, removeFile } from './services/s3Service';

/**
 * Handles file add and remove events.
 *
 * @param {string} filePath - The path of the file.
 * @param {'upload' | 'remove'} type - The type of event.
 */
const handleFileEvent = async (filePath: string, type: 'upload' | 'remove'): Promise<void> => {
  logger.info(`File Event: ${filePath} | Type: ${type}`);
  const key: string = createKey(filePath);

  try {
    const exists: boolean = await checkExists(key);

    if (type === 'upload') {
      await uploadFile(fs.readFileSync(filePath), key);
    } else {
      await removeFile(key);
    }
  } catch (error: any) {
    logger.error(`Operation Error for ${filePath} | Type: ${type} | Error: ${error.message}`);
  }
};

// Initialize the file watcher
initWatcher(
  (filePath: string) => handleFileEvent(filePath, 'upload'),
  (filePath: string) => handleFileEvent(filePath, 'remove')
);
