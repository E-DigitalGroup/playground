// src/config/config.ts

import dotenv from 'dotenv';

/**
 * Load environment variables from a `.env` file into `process.env`.
 * This allows you to manage configuration outside of your source code.
 */
dotenv.config();

/**
 * Enum representing the possible logging levels.
 * This ensures that only valid log levels are used throughout the application.
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}

/**
 * Interface defining the shape of the configuration object.
 * This enforces type safety and ensures that all necessary configuration
 * parameters are present and correctly typed.
 */
export interface Config {
  /** 
   * Google API Key used to authenticate requests to Google Places API.
   * It should be kept secure and not exposed publicly.
   */
  googleApiKey: string;

  /**
   * Place ID for which the reviews are to be fetched.
   * This uniquely identifies a place in Google Places API.
   */
  placeId: string;

  /**
   * Logging level determining the verbosity of logs.
   * Controls the amount of information logged by the application.
   */
  logLevel: LogLevel;
}

/**
 * Configuration object containing all necessary settings for the application.
 * Values are sourced from environment variables with default fallbacks where applicable.
 * 
 * @constant
 * @type {Config}
 */
export const config: Config = {
  /**
   * Retrieve the Google API Key from environment variables.
   * If not set, default to an empty string.
   * 
   * @type {string}
   */
  googleApiKey: process.env.GOOGLE_API_KEY || '',

  /**
   * Retrieve the Place ID from environment variables.
   * If not set, default to an empty string.
   * 
   * @type {string}
   */
  placeId: process.env.PLACE_ID || '',

  /**
   * Retrieve the log level from environment variables.
   * If not set, default to 'info'.
   * 
   * @type {LogLevel}
   */
  logLevel: (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO,
};
