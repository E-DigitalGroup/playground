// src/config/config.ts

/**
 * Configuration Module
 * 
 * This module is responsible for loading and validating environment variables
 * required for the application. It uses the `dotenv` library to load variables
 * from a `.env` file and ensures that all necessary configurations are available
 * before the application runs.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the `.env` file into `process.env`
dotenv.config();

/**
 * Config Interface
 * 
 * Defines the structure of the required environment variables.
 */
interface Config {
    /** 
     * Path to the Pass Type ID certificate file (.pem).
     * Example: "./certs/pass-cert.pem"
     */
    PASS_CERT_PATH: string;

    /**
     * Path to the WWDR (Apple Worldwide Developer Relations) certificate file (.pem).
     * Example: "./certs/wwdr.pem"
     */
    WWDR_CERT_PATH: string;

    /**
     * The Pass Type Identifier (e.g., "pass.com.yourcompany.membership").
     */
    PASS_TYPE_IDENTIFIER: string;

    /**
     * The team identifier associated with your Apple Developer account.
     * Example: "ABCDE12345"
     */
    TEAM_IDENTIFIER: string;

    /**
     * The path to the template JSON file defining the pass structure.
     * Example: "./templates/pass.json"
     */
    PASS_TEMPLATE_PATH: string;

    /**
     * Output directory where generated `.pkpass` files will be saved.
     * Example: "./output"
     */
    OUTPUT_DIR: string;
}

/**
 * Function to validate and retrieve environment variables.
 * Throws an error if any required variable is missing.
 */
function getConfig(): Config {
    const {
        PASS_CERT_PATH,
        WWDR_CERT_PATH,
        PASS_TYPE_IDENTIFIER,
        TEAM_IDENTIFIER,
        PASS_TEMPLATE_PATH,
        OUTPUT_DIR,
    } = process.env;

    // Validate presence of all required environment variables
    if (
        !PASS_CERT_PATH ||
        !WWDR_CERT_PATH ||
        !PASS_TYPE_IDENTIFIER ||
        !TEAM_IDENTIFIER ||
        !PASS_TEMPLATE_PATH ||
        !OUTPUT_DIR
    ) {
        throw new Error(
            'Missing one or more required environment variables. Please check your .env file.'
        );
    }

    return {
        // Resolve absolute paths for certificate and template files
        PASS_CERT_PATH: path.resolve(PASS_CERT_PATH),
        WWDR_CERT_PATH: path.resolve(WWDR_CERT_PATH),
        PASS_TYPE_IDENTIFIER,
        TEAM_IDENTIFIER,
        PASS_TEMPLATE_PATH: path.resolve(PASS_TEMPLATE_PATH),
        OUTPUT_DIR: path.resolve(OUTPUT_DIR),
    };
}

// Retrieve and export the validated configuration
const config = getConfig();
export default config;
