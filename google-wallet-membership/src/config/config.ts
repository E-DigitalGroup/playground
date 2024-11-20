// src/config/config.ts

/**
 * Configuration Module
 * 
 * This module is responsible for loading and validating environment variables
 * required for the application. It uses the `dotenv` library to load variables
 * from a `.env` file and ensures that all necessary configurations are present
 * before the application proceeds.
 */

// Import the `dotenv` library to load environment variables from a `.env` file
import * as dotenv from 'dotenv';

// Import the `path` module to handle and transform file paths
import * as path from 'path';

// Load environment variables from the `.env` file into `process.env`
dotenv.config();

/**
 * Config Interface
 * 
 * Defines the shape and types of the required environment variables.
 * This ensures type safety and clarity when accessing configuration values.
 */
interface Config {
    /** 
     * Relative or absolute path to the Google Cloud service account key file.
     * Example: "./path/to/service-account-key.json"
     */
    SERVICE_ACCOUNT_KEY_PATH: string;

    /** 
     * The unique identifier for your Google Cloud project.
     * You can find this in the Google Cloud Console.
     */
    PROJECT_ID: string;

    /** 
     * Unique identifier for the Google Wallet membership class.
     * Format typically follows "issuerId.classSuffix".
     * Example: "1234567890.abcd1234"
     */
    WALLET_CLASS_ID: string;

    /** 
     * Unique identifier for the Google Wallet membership object.
     * Format typically follows "issuerId.objectSuffix".
     * Example: "1234567890.xyz9876"
     */
    WALLET_OBJECT_ID: string;
}

/**
 * getConfig Function
 * 
 * Retrieves and validates the necessary environment variables.
 * Throws an error if any required variable is missing to prevent
 * the application from running with incomplete configurations.
 * 
 * @returns {Config} An object containing all required configuration values.
 * @throws Will throw an error if any required environment variable is missing.
 */
function getConfig(): Config {
    // Destructure the required environment variables from `process.env`
    const {
        SERVICE_ACCOUNT_KEY_PATH,
        PROJECT_ID,
        WALLET_CLASS_ID,
        WALLET_OBJECT_ID,
    } = process.env;

    // Check if any of the required environment variables are missing
    if (
        !SERVICE_ACCOUNT_KEY_PATH ||
        !PROJECT_ID ||
        !WALLET_CLASS_ID ||
        !WALLET_OBJECT_ID
    ) {
        // Throw an error with a descriptive message if validation fails
        throw new Error(
            'Missing one or more required environment variables. Please check your .env file.'
        );
    }

    // Return the validated and resolved configuration object
    return {
        // Resolve the absolute path to the service account key file
        SERVICE_ACCOUNT_KEY_PATH: path.resolve(SERVICE_ACCOUNT_KEY_PATH),

        // Google Cloud Project ID
        PROJECT_ID,

        // Google Wallet Membership Class ID
        WALLET_CLASS_ID,

        // Google Wallet Membership Object ID
        WALLET_OBJECT_ID,
    };
}

// Invoke `getConfig` to retrieve the configuration object
const config = getConfig();

// Export the configuration object as the default export of this module
export default config;
