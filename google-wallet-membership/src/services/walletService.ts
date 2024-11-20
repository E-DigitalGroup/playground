// src/services/walletService.ts

/**
 * WalletService Module
 * 
 * This module handles interactions with the Google Wallet API, specifically
 * creating membership classes and membership objects. It utilizes Axios for 
 * HTTP requests, AuthService for obtaining access tokens, and a Logger utility 
 * for logging information and errors.
 */

import axios from 'axios'; // Import Axios for making HTTP requests
import authService from './authService'; // Import AuthService to obtain access tokens
import config from '../config/config'; // Import configuration settings
import { MembershipClass, MembershipObject } from '../interfaces/walletInterfaces'; // Import TypeScript interfaces
import logger from '../utils/logger'; // Import Logger utility

/**
 * WalletService Class
 * 
 * Provides methods to interact with the Google Wallet API for managing
 * membership classes and objects.
 */
class WalletService {
    /**
     * Base URL for the Google Wallet API endpoints.
     * 
     * @private
     * @type {string}
     */
    private baseUrl: string = 'https://walletobjects.googleapis.com/walletobjects/v1';

    /**
     * Creates a membership class in Google Wallet.
     * 
     * A membership class defines the overarching properties of a membership card,
     * such as issuer name, provider, program name, logos, descriptions, and other
     * metadata. This method sends a POST request to the Google Wallet API to create
     * the class.
     * 
     * @param {MembershipClass} classData - The data representing the membership class.
     * @returns {Promise<void>} - A promise that resolves when the class is successfully created.
     * 
     * @example
     * const classData: MembershipClass = { ... };
     * await walletService.createMembershipClass(classData);
     */
    async createMembershipClass(classData: MembershipClass): Promise<void> {
        // Obtain an access token using the AuthService
        const accessToken = await authService.getAccessToken();

        try {
            // Make a POST request to the Google Wallet API to create the membership class
            const response = await axios.post(
                `${this.baseUrl}/membershipClass/`, // API endpoint for creating membership classes
                classData, // Payload containing membership class details
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization header with Bearer token
                        'Content-Type': 'application/json', // Specify JSON content type
                    },
                }
            );

            // Log the successful creation of the membership class with response data
            logger.info('Membership Class Created:', response.data);
        } catch (error: any) {
            /**
             * Error Handling
             * 
             * If an error occurs during the API request, it is caught here.
             * The error details are logged for debugging purposes.
             * 
             * @note The error message includes either the response data from the API
             *       or a generic error message if the response data is unavailable.
             */
            logger.error(
                'Error creating membership class:',
                error.response?.data || error.message
            );
        }
    }

    /**
     * Creates a membership object in Google Wallet.
     * 
     * A membership object represents an individual instance of a membership card
     * issued to a user. It is associated with a membership class and contains specific
     * details such as member information, loyalty points, barcodes, and other metadata.
     * This method sends a POST request to the Google Wallet API to create the object.
     * 
     * @param {MembershipObject} objectData - The data representing the membership object.
     * @returns {Promise<void>} - A promise that resolves when the object is successfully created.
     * 
     * @example
     * const objectData: MembershipObject = { ... };
     * await walletService.createMembershipObject(objectData);
     */
    async createMembershipObject(objectData: MembershipObject): Promise<void> {
        // Obtain an access token using the AuthService
        const accessToken = await authService.getAccessToken();

        try {
            // Make a POST request to the Google Wallet API to create the membership object
            const response = await axios.post(
                `${this.baseUrl}/membershipObject/`, // API endpoint for creating membership objects
                objectData, // Payload containing membership object details
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Authorization header with Bearer token
                        'Content-Type': 'application/json', // Specify JSON content type
                    },
                }
            );

            // Log the successful creation of the membership object with response data
            logger.info('Membership Object Created:', response.data);
        } catch (error: any) {
            /**
             * Error Handling
             * 
             * If an error occurs during the API request, it is caught here.
             * The error details are logged for debugging purposes.
             * 
             * @note The error message includes either the response data from the API
             *       or a generic error message if the response data is unavailable.
             */
            logger.error(
                'Error creating membership object:',
                error.response?.data || error.message
            );
        }
    }

    /**
     * Additional Methods
     * 
     * Future methods such as updating or deleting membership classes and objects
     * can be added here following the same structure and error handling patterns.
     */
}

/**
 * Export an instance of WalletService
 * 
 * By exporting a single instance, we ensure that the service is consistent and
 * reused across the application without creating multiple instances.
 */
export default new WalletService();
