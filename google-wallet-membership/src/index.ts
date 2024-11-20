// src/index.ts

/**
 * Main Entry Point
 * 
 * This script initializes and executes the creation of a Membership Class and 
 * Membership Object in Google Wallet using the WalletService. It defines the 
 * necessary data structures and handles any unexpected errors that may occur 
 * during the execution.
 */

import walletService from './services/walletService'; // Import WalletService for interacting with Google Wallet API
import { MembershipClass, MembershipObject } from './interfaces/walletInterfaces'; // Import TypeScript interfaces for type safety
import config from './config/config'; // Import configuration settings

/**
 * Main Function
 * 
 * Orchestrates the creation of a Membership Class and a corresponding Membership 
 * Object. It defines the data required for both entities and utilizes the WalletService 
 * to communicate with the Google Wallet API.
 */
async function main() {
    /**
     * Define Membership Class Data
     * 
     * The Membership Class defines the overarching properties of the membership program,
     * such as issuer information, program details, branding assets, and additional metadata.
     */
    const classData: MembershipClass = {
        id: config.WALLET_CLASS_ID, // Unique identifier for the membership class
        issuerName: "Your Company Name", // Name of the issuer (your company)
        provider: "Your Company", // Provider of the membership (usually same as issuer)
        programName: "Premium Membership", // Name of the membership program
        programLogo: {
            sourceUri: {
                uri: "https://yourdomain.com/logo.png", // URL to the program logo image
                description: "Company Logo", // Description of the logo image
            },
        },
        programDescription: "Access to exclusive content, events, and discounts.", // Description of the membership program
        heroImage: {
            sourceUri: {
                uri: "https://yourdomain.com/hero-image.png", // URL to the hero image displayed on the membership card
                description: "Hero Image", // Description of the hero image
            },
        },
        textModulesData: [
            {
                header: "Membership Benefits", // Header for the text module
                body: "Enjoy exclusive access to premium features and events.", // Body content of the text module
            },
            {
                header: "Contact Us", // Header for the second text module
                body: "Email: support@yourcompany.com\nPhone: +1-234-567-890", // Contact information
            },
        ],
        linksModuleData: {
            uris: [
                "https://yourdomain.com/dashboard", // Link to the user dashboard
                "https://yourdomain.com/support", // Link to the support page
            ],
        },
        barcode: {
            type: "qrCode", // Type of barcode (e.g., "qrCode")
            value: "https://yourdomain.com/verify?membershipId=123456", // Data encoded in the barcode
        },
        reviewStatus: "underReview", // Current review status of the membership class
        reviewStatusMessage: "Your membership class is under review.", // Message associated with the review status
        enableSmartTap: true, // Enables Smart Tap functionality for enhanced user experience
        locations: [
            {
                kind: "walletobjects#latLongPoint", // Specifies the type of location point
                latitude: 37.7749, // Latitude coordinate
                longitude: -122.4194, // Longitude coordinate
            },
            {
                kind: "walletobjects#latLongPoint", // Another location point
                latitude: 34.0522, // Latitude coordinate
                longitude: -118.2437, // Longitude coordinate
            },
        ],
        // Additional fields can be added here as per Google Wallet API documentation
    };

    /**
     * Define Membership Object Data
     * 
     * The Membership Object represents an individual instance of the membership card,
     * containing user-specific information, loyalty points, and other personalized data.
     */
    const objectData: MembershipObject = {
        id: config.WALLET_OBJECT_ID, // Unique identifier for the membership object
        classId: config.WALLET_CLASS_ID, // Reference to the associated membership class
        state: "active", // Current state of the membership ("active", "inactive", "blocked")
        memberSince: "2023-01-01T00:00:00Z", // Date when the membership started (ISO 8601 format)
        memberExpires: "2025-01-01T00:00:00Z", // Expiration date of the membership (ISO 8601 format)
        loyaltyPoints: {
            name: "Points", // Name of the loyalty points system
            points: 1500, // Total loyalty points accumulated by the member
            ratio: "1:1", // Conversion ratio for loyalty points
            label: "Loyalty Points", // Label describing the loyalty points
        },
        barcode: {
            type: "qrCode", // Type of barcode (e.g., "qrCode")
            value: "https://yourdomain.com/verify?membershipId=123456", // Data encoded in the barcode
        },
        infoModuleData: {
            labelValuePairs: [
                { label: "Member ID", value: "123456" }, // Member-specific identifier
                { label: "Tier", value: "Gold" }, // Membership tier or level
            ],
        },
        linksModuleData: {
            uris: [
                "https://yourdomain.com/profile", // Link to the member's profile page
                "https://yourdomain.com/rewards", // Link to the rewards page
            ],
        },
        textModulesData: [
            {
                header: "Welcome!", // Header for the welcome message
                body: "Thank you for being a Gold member. Enjoy your exclusive benefits.", // Welcome message content
            },
            {
                header: "Renewal Date", // Header for the renewal date information
                body: "Your membership expires on 2025-01-01.", // Renewal date details
            },
        ],
        // Additional fields can be added here as per Google Wallet API documentation
    };

    /**
     * Create Membership Class
     * 
     * Utilizes the WalletService to create a new Membership Class in Google Wallet.
     * This defines the properties and branding of the membership program.
     */
    await walletService.createMembershipClass(classData);

    /**
     * Create Membership Object
     * 
     * Utilizes the WalletService to create a new Membership Object in Google Wallet.
     * This represents an individual membership card issued to a user.
     */
    await walletService.createMembershipObject(objectData);
}

/**
 * Execute Main Function
 * 
 * Invokes the main function and handles any unexpected errors that may occur
 * during its execution. Ensures that errors are logged for debugging purposes.
 */
main().catch((error) => {
    console.error('Unexpected Error:', error);
});
