// src/services/authService.ts

/**
 * Authentication Service Module
 * 
 * This module handles authentication with Google APIs using service account credentials.
 * It utilizes the `google-auth-library` to obtain access tokens required for authorized
 * API requests to the Google Wallet API.
 */

import { GoogleAuth } from 'google-auth-library'; // Import GoogleAuth from google-auth-library
import config from '../config/config'; // Import the configuration object

/**
 * AuthService Class
 * 
 * Manages authentication processes with Google APIs. It initializes the GoogleAuth
 * client with the necessary credentials and scopes, and provides a method to retrieve
 * an access token for authorized API interactions.
 */
class AuthService {
    private auth: GoogleAuth; // Private property to hold the GoogleAuth instance

    /**
     * Constructor
     * 
     * Initializes the GoogleAuth instance with the service account key file and the
     * required scopes for accessing the Google Wallet API.
     */
    constructor() {
        this.auth = new GoogleAuth({
            // Path to the service account key file
            keyFile: config.SERVICE_ACCOUNT_KEY_PATH,

            // Scopes define the level of access required. Here, it allows issuing wallet objects.
            scopes: ['https://www.googleapis.com/auth/wallet_object.issuer'],
        });
    }

    /**
     * getAccessToken Method
     * 
     * Asynchronously retrieves an access token using the service account credentials.
     * This token is necessary for making authorized requests to the Google Wallet API.
     * 
     * @returns {Promise<string>} - A promise that resolves to the access token string.
     * @throws Will throw an error if the access token cannot be obtained.
     */
    async getAccessToken(): Promise<string> {
        try {
            // Obtain a client instance from the GoogleAuth library
            const client = await this.auth.getClient();

            // Retrieve the access token from the client
            const tokenResponse = await client.getAccessToken();

            // Check if the token is present
            if (!tokenResponse.token) {
                // If not, throw an error indicating failure to obtain the token
                throw new Error('Failed to obtain access token');
            }

            // Return the retrieved access token
            return tokenResponse.token;
        } catch (error: any) {
            // Log the error for debugging purposes
            console.error('Authentication Error:', error.message);

            // Re-throw the error to be handled by the calling function
            throw new Error(`Authentication failed: ${error.message}`);
        }
    }
}

/**
 * Export an instance of AuthService
 * 
 * By exporting a single instance, we ensure that the authentication configuration
 * is consistent and reused across the application.
 */
export default new AuthService();
