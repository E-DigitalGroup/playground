// src/interfaces/passInterfaces.ts

/**
 * Pass Interfaces Module
 * 
 * This module defines TypeScript interfaces for various components of the Apple Wallet
 * pass, specifically for Membership Passes. These interfaces ensure type safety and provide
 * a clear structure for the pass data being sent to the PassKit library.
 */

/**
 * Interface for Images used in the pass.
 * 
 * Represents images like logos, icons, and strip images required by the pass.
 */
export interface PassImages {
    /** 
     * The path to the icon image file.
     * Required for all pass types.
     */
    icon: string;

    /** 
     * The path to the logo image file.
     * Required for most pass types.
     */
    logo: string;

    /** 
     * The path to the strip image file.
     * Optional, but recommended for enhanced visual appeal.
     */
    strip?: string;

    /** 
     * The path to the thumbnail image file.
     * Optional, used for notifications.
     */
    thumbnail?: string;
}

/**
 * Interface for Fields in the pass.
 * 
 * Defines key-value pairs displayed on the pass, such as membership details.
 */
export interface PassField {
    /**
     * The key of the field.
     * Example: "memberName"
     */
    key: string;

    /**
     * The label of the field displayed to the user.
     * Example: "Member Name"
     */
    label: string;

    /**
     * The value of the field.
     * Example: "John Doe"
     */
    value: string;
}

/**
 * Interface for the Membership Pass JSON structure.
 * 
 * Represents the overall structure of the pass, including pass type identifier,
 * team identifier, organization name, serial number, description, and relevant fields.
 */
export interface MembershipPass {
    /**
     * The Pass Type Identifier, must match the one used to create certificates.
     */
    passTypeIdentifier: string;

    /**
     * The Team Identifier associated with your Apple Developer account.
     */
    teamIdentifier: string;

    /**
     * The organization name displayed on the pass.
     */
    organizationName: string;

    /**
     * The description of the pass.
     */
    description: string;

    /**
     * The serial number of the pass.
     */
    serialNumber: string;

    /**
     * The relevant date for the pass, e.g., membership expiration.
     */
    relevantDate: string; // ISO 8601 format

    /**
     * The foreground color of the pass, in hexadecimal.
     * Example: "#FFFFFF"
     */
    foregroundColor: string;

    /**
     * The background color of the pass, in hexadecimal.
     * Example: "#000000"
     */
    backgroundColor: string;

    /**
     * The label color of the pass, in hexadecimal.
     * Example: "#FF0000"
     */
    labelColor: string;

    /**
     * Images used in the pass.
     */
    images: PassImages;

    /**
     * Header fields displayed prominently on the pass.
     */
    headerFields: PassField[];

    /**
     * Primary fields that contain essential information.
     */
    primaryFields: PassField[];

    /**
     * Secondary fields providing additional details.
     */
    secondaryFields?: PassField[];

    /**
     * Auxiliary fields for supplementary information.
     */
    auxiliaryFields?: PassField[];

    /**
     * Back fields for information displayed on the back of the pass.
     */
    backFields?: PassField[];

    /**
     * Barcode information for scanning.
     */
    barcode: {
        message: string; // Data encoded in the barcode
        format: string; // e.g., "PKBarcodeFormatQR"
        messageEncoding: string; // e.g., "iso-8859-1"
    };

    /**
     * Optional web service URL for pass updates.
     */
    webServiceURL?: string;

    /**
     * Optional authentication token for web service.
     */
    authenticationToken?: string;

    // Add other fields as per Apple PassKit documentation
}
