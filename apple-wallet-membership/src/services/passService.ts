// src/services/passService.ts

/**
 * PassService Module
 * 
 * This module handles the creation and signing of Apple Wallet passes using the
 * PassKit framework. It utilizes the `passkit-generator` library to generate
 * `.pkpass` files based on provided pass data and templates.
 */

import { PKPass } from 'passkit-generator'; // Correctly import PKPass as a named export from passkit-generator
import fs from 'fs'; // Import File System module for file operations
import path from 'path'; // Import Path module for handling file paths
import config from '../config/config'; // Import configuration settings
import logger from '../utils/logger'; // Import Logger utility for logging
import { MembershipPass, PassImages } from '../interfaces/passInterfaces'; // Import TypeScript interfaces

/**
 * PassService Class
 * 
 * Provides methods to create and sign Apple Wallet Membership Passes. It reads
 * pass templates, incorporates dynamic data, and generates signed `.pkpass` files.
 */
class PassService {
    /**
     * Creates and signs a membership pass.
     * 
     * @param {MembershipPass} passData - The data defining the membership pass.
     * @param {string} outputFileName - The desired filename for the generated `.pkpass` file.
     * @returns {Promise<void>}
     * 
     * @example
     * ```typescript
     * await passService.createMembershipPass(passData, 'membership123.pkpass');
     * ```
     */
    async createMembershipPass(passData: MembershipPass, outputFileName: string): Promise<void> {
        try {
            // Read the pass template JSON file
            const templateJSON = fs.readFileSync(config.PASS_TEMPLATE_PATH, 'utf-8');
            const passTemplate = JSON.parse(templateJSON);

            // Initialize PKPass with the pass template and certificates
            const pass = new PKPass({
                model: passTemplate, // Pass template JSON structure
                certificates: {
                    wwdr: fs.readFileSync(config.WWDR_CERT_PATH), // Apple WWDR certificate as Buffer
                    signerCert: fs.readFileSync(config.PASS_CERT_PATH), // Pass Type ID certificate as Buffer
                    signerKey: {
                        keyFile: fs.readFileSync(config.PASS_CERT_PATH), // Private key as Buffer
                        passphrase: '', // Passphrase for the private key if any
                    },
                },
                overrides: passData, // Dynamic pass data to override the template
            });

            /**
             * Add Images to the Pass
             * 
             * Iterates through the images defined in the pass data and adds them to the pass.
             * Logs a warning if any image file is not found.
             */
            const images: PassImages = passData.images;
            for (const [key, imagePath] of Object.entries(images)) {
                if (imagePath) {
                    const absolutePath = path.resolve(imagePath);
                    if (fs.existsSync(absolutePath)) {
                        // Add the image to the pass
                        const imageBuffer = fs.readFileSync(absolutePath);
                        pass.images.add(key, imageBuffer);
                    } else {
                        // Log a warning if the image file does not exist
                        logger.warn(`Image file not found: ${absolutePath}`);
                    }
                }
            }

            /**
             * Generate the Signed `.pkpass` File
             * 
             * Uses PKPass to generate a signed pass package (`.pkpass`).
             */
            const buffer = await pass.generate();

            /**
             * Ensure Output Directory Exists
             * 
             * Checks if the output directory exists. If not, creates it recursively.
             */
            if (!fs.existsSync(config.OUTPUT_DIR)) {
                fs.mkdirSync(config.OUTPUT_DIR, { recursive: true });
                logger.info(`Created output directory: ${config.OUTPUT_DIR}`);
            }

            /**
             * Write the `.pkpass` File to the Output Directory
             * 
             * Saves the generated pass to the specified output directory with the given filename.
             */
            const outputPath = path.join(config.OUTPUT_DIR, outputFileName);
            fs.writeFileSync(outputPath, buffer);
            logger.info(`Pass created successfully: ${outputPath}`);
        } catch (error: any) {
            /**
             * Error Handling
             * 
             * Catches any errors that occur during the pass creation process and logs them.
             * Provides the error message for debugging purposes.
             */
            logger.error('Error creating membership pass:', error.message);
        }
    }

    /**
     * Additional Methods
     * 
     * Future methods such as updating or deleting passes can be implemented here.
     * Ensure to follow similar patterns for error handling and logging.
     */
}

/**
 * Export an instance of PassService
 * 
 * By exporting a single instance, we ensure that the service is consistent and
 * reused across the application without creating multiple instances.
 */
export default new PassService();
