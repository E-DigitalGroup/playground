// src/index.ts

/**
 * Main Entry Point
 * 
 * This script initializes and executes the creation of an Apple Wallet Membership Pass
 * using the PassService. It defines the necessary pass data and handles any unexpected
 * errors that may occur during the execution.
 */

import passService from './services/passService'; // Import PassService for pass creation
import { MembershipPass } from './interfaces/passInterfaces'; // Import MembershipPass interface
import config from './config/config'; // Import configuration settings
import logger from './utils/logger'; // Import Logger utility

/**
 * Main Function
 * 
 * Orchestrates the creation of an Apple Wallet Membership Pass. It defines the
 * data required for the pass, including images, fields, barcode, and other metadata,
 * and utilizes the PassService to generate and sign the pass.
 */
async function main() {
    /**
     * Define Membership Pass Data
     * 
     * The MembershipPass object defines all necessary data for the Apple Wallet pass,
     * including pass type identifier, team identifier, organization details, images,
     * fields, barcode, and optional web service configurations.
     */
    const passData: MembershipPass = {
        passTypeIdentifier: config.PASS_TYPE_IDENTIFIER, // Pass Type Identifier from Apple Developer account
        teamIdentifier: config.TEAM_IDENTIFIER, // Team Identifier from Apple Developer account
        organizationName: "Your Company Name", // Name of your organization
        description: "Premium Membership Pass", // Description of the pass
        serialNumber: "1234567890", // Unique serial number for the pass
        relevantDate: "2025-01-01T00:00:00Z", // Date relevant to the pass, e.g., membership expiration
        foregroundColor: "#FFFFFF", // Foreground color in hexadecimal
        backgroundColor: "#000000", // Background color in hexadecimal
        labelColor: "#FF0000", // Label color in hexadecimal
        images: {
            icon: "./images/icon.png", // Path to the icon image
            logo: "./images/logo.png", // Path to the logo image
            strip: "./images/strip.png", // Path to the strip image (optional)
            thumbnail: "./images/thumbnail.png", // Path to the thumbnail image (optional)
        },
        headerFields: [
            {
                key: "membership",
                label: "Membership",
                value: "Gold",
            },
        ],
        primaryFields: [
            {
                key: "memberName",
                label: "Member Name",
                value: "John Doe",
            },
            {
                key: "memberId",
                label: "Member ID",
                value: "123456",
            },
        ],
        secondaryFields: [
            {
                key: "expiry",
                label: "Expires",
                value: "2025-01-01",
            },
        ],
        auxiliaryFields: [
            {
                key: "points",
                label: "Points",
                value: "1500",
            },
        ],
        backFields: [
            {
                key: "terms",
                label: "Terms and Conditions",
                value: "Membership is subject to terms and conditions.",
            },
        ],
        barcode: {
            message: "https://yourdomain.com/verify?membershipId=123456", // Data encoded in the barcode
            format: "PKBarcodeFormatQR", // Supported formats: PKBarcodeFormatQR, PKBarcodeFormatPDF417, etc.
            messageEncoding: "iso-8859-1", // Encoding format
        },
        webServiceURL: "https://yourdomain.com/passes/", // URL for pass updates (optional)
        authenticationToken: "your-authentication-token", // Token for pass updates (optional)
    };

    /**
     * Define Output Filename
     * 
     * Specifies the desired filename for the generated `.pkpass` file.
     */
    const outputFileName = "membership123.pkpass";

    /**
     * Create Membership Pass
     * 
     * Utilizes the PassService to create and sign the membership pass. The generated
     * `.pkpass` file will be saved in the specified output directory.
     */
    await passService.createMembershipPass(passData, outputFileName);
}

/**
 * Execute Main Function
 * 
 * Invokes the main function and handles any unexpected errors that may occur
 * during its execution. Ensures that errors are logged for debugging purposes.
 */
main().catch((error) => {
    logger.error('Unexpected Error:', error);
});
