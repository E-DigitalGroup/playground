// src/config/index.ts

import dotenv from 'dotenv';
import winston from 'winston';
import { Config } from '../types/config';

dotenv.config();

/**
 * Defines the structure of the configuration object.
 */
interface RawConfig {
  S3_REGION?: string;
  S3_BUCKET_ACCESS_KEY_ID?: string;
  S3_BUCKET_SECRET_ACCESS_KEY?: string;
  S3_BUCKET_NAME?: string;
  DIRECTORY?: string;
  FOLDER?: string;
}

/**
 * Loads and validates configuration from environment variables.
 * Exits the process if any required configuration is missing.
 *
 * @returns {Config} - The validated configuration object.
 */
const loadConfig = (): Config => {
  const rawConfig: RawConfig = {
    S3_REGION: process.env.S3_REGION,
    S3_BUCKET_ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID,
    S3_BUCKET_SECRET_ACCESS_KEY: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    DIRECTORY: process.env.DIRECTORY,
    FOLDER: process.env.FOLDER,
  };

  const missingConfig = Object.entries(rawConfig).filter(([_, value]) => !value);

  if (missingConfig.length > 0) {
    const missingKeys = missingConfig.map(([key]) => key).join(', ');
    winston.error(`Missing configuration for: ${missingKeys}`);
    process.exit(1);
  }

  return {
    S3_REGION: rawConfig.S3_REGION!,
    S3_BUCKET_ACCESS_KEY_ID: rawConfig.S3_BUCKET_ACCESS_KEY_ID!,
    S3_BUCKET_SECRET_ACCESS_KEY: rawConfig.S3_BUCKET_SECRET_ACCESS_KEY!,
    S3_BUCKET_NAME: rawConfig.S3_BUCKET_NAME!,
    DIRECTORY: rawConfig.DIRECTORY!,
    FOLDER: rawConfig.FOLDER!,
  };
};

const config: Config = loadConfig();

export default config;
