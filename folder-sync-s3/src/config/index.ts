// src/config/index.ts

import dotenv from 'dotenv';
import path from 'path';
import logger from '../utils/logger';
import { getBasePath } from '../utils/pathUtils';

import { Config } from '../types/config';

const loadConfig = (): Config => {
  const basePath = getBasePath();
  const envPath = path.join(basePath, '.env');

  // Load environment variables from .env file
  dotenv.config({ path: envPath });

  const config: Config = {
    S3_REGION: process.env.S3_REGION || '',
    S3_BUCKET_ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID || '',
    S3_BUCKET_SECRET_ACCESS_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY || '',
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
    DIRECTORY: process.env.DIRECTORY || '',
    FOLDER: process.env.FOLDER || '',
  };

  // Validate configuration
  const missingConfig = Object.entries(config).filter(([_, value]) => !value);
  if (missingConfig.length > 0) {
    logger.error(
      `Missing configuration for: ${missingConfig.map(([key]) => key).join(', ')}`
    );
    process.exit(1);
  }

  return config;
};

const config: Config = loadConfig();

export default config;
