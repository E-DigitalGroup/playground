// src/interfaces/walletInterfaces.ts

/**
 * Wallet Interfaces Module
 * 
 * This module defines TypeScript interfaces for various components of the Google Wallet
 * Membership Class and Membership Object. These interfaces ensure type safety and provide
 * a clear structure for the data being sent to and received from the Google Wallet API.
 */

/**
 * Interface for Image
 * 
 * Represents an image used in the membership card, such as logos or hero images.
 */
export interface Image {
    /**
     * The source URI of the image.
     */
    sourceUri: {
        /**
         * The direct URL to the image resource.
         */
        uri: string;

        /**
         * Optional description of the image.
         */
        description?: string;
    };
}

/**
 * Interface for Text Module
 * 
 * Defines a text module containing a header and body, used to display additional information
 * on the membership card.
 */
export interface TextModule {
    /**
     * The header or title of the text module.
     */
    header: string;

    /**
     * The body or main content of the text module.
     */
    body: string;
}

/**
 * Interface for Links Module
 * 
 * Contains an array of URIs that can be used to link to external resources or actions.
 */
export interface LinksModule {
    /**
     * An array of URIs linking to relevant web pages or resources.
     */
    uris: string[];
}

/**
 * Interface for Location
 * 
 * Represents a geographical location where the membership benefits are applicable or available.
 */
export interface Location {
    /**
     * The kind of location point, typically "walletobjects#latLongPoint".
     */
    kind: string; // e.g., "walletobjects#latLongPoint"

    /**
     * The latitude of the location in decimal degrees.
     */
    latitude: number;

    /**
     * The longitude of the location in decimal degrees.
     */
    longitude: number;
}

/**
 * Interface for Membership Class
 * 
 * Defines the structure of a Membership Class in Google Wallet, outlining the overall
 * properties and appearance of the membership card.
 */
export interface MembershipClass {
    /**
     * A unique identifier for the membership class.
     * Format: "issuerId.classSuffix"
     * Example: "1234567890.abcd1234"
     */
    id: string;

    /**
     * The name of the issuer (your company or organization).
     */
    issuerName: string;

    /**
     * The provider of the membership, typically the same as the issuer.
     */
    provider: string;

    /**
     * The name of the membership program.
     */
    programName: string;

    /**
     * The logo image for the membership program.
     */
    programLogo: Image;

    /**
     * Optional description of the membership program.
     */
    programDescription?: string;

    /**
     * Optional hero image displayed prominently on the membership card.
     */
    heroImage?: Image;

    /**
     * Optional array of text modules providing additional information or benefits.
     */
    textModulesData?: TextModule[];

    /**
     * Optional links module containing URIs to relevant web pages.
     */
    linksModuleData?: LinksModule;

    /**
     * Optional barcode information for quick scanning and verification.
     */
    barcode?: {
        /**
         * The type of barcode (e.g., "qrCode").
         */
        type: string; // e.g., "qrCode"

        /**
         * The value or data encoded in the barcode.
         */
        value: string;
    };

    /**
     * Optional review status of the membership class.
     * Possible values: "underReview", "approved", "rejected".
     */
    reviewStatus?: string; // e.g., "underReview", "approved", "rejected"

    /**
     * Optional message providing additional context about the review status.
     */
    reviewStatusMessage?: string;

    /**
     * Optional flag to enable Smart Tap functionality.
     */
    enableSmartTap?: boolean;

    /**
     * Optional array of locations where the membership benefits are applicable.
     */
    locations?: Location[];

    // Add other fields as per Google Wallet API documentation
}

/**
 * Interface for Loyalty Points
 * 
 * Represents loyalty points associated with a membership, including the point system's
 * name, the number of points, the conversion ratio, and a label describing the points.
 */
export interface LoyaltyPoints {
    /**
     * The name of the loyalty points system (e.g., "Points").
     */
    name: string;

    /**
     * The total number of loyalty points accumulated by the member.
     */
    points: number;

    /**
     * The conversion ratio for loyalty points (e.g., "1:1").
     */
    ratio: string;

    /**
     * A label describing the type of loyalty points (e.g., "Loyalty Points").
     */
    label: string;
}

/**
 * Interface for Info Module Data
 * 
 * Contains additional information presented as label-value pairs on the membership card.
 */
export interface InfoModuleData {
    /**
     * An array of objects containing labels and their corresponding values.
     * Useful for displaying member-specific information like Member ID or Tier.
     */
    labelValuePairs: { label: string; value: string }[];
}

/**
 * Interface for Membership Object
 * 
 * Defines the structure of a Membership Object in Google Wallet, representing an
 * individual instance of a membership card issued to a user.
 */
export interface MembershipObject {
    /**
     * A unique identifier for the membership object.
     * Format: "issuerId.objectSuffix"
     * Example: "1234567890.xyz9876"
     */
    id: string;

    /**
     * The unique identifier of the associated membership class.
     */
    classId: string;

    /**
     * The current state of the membership.
     * Possible values: "active", "inactive", "blocked".
     */
    state: string; // e.g., "active", "inactive", "blocked"

    /**
     * Optional date indicating when the membership started.
     * Format: ISO 8601 date string (e.g., "2023-01-01T00:00:00Z").
     */
    memberSince?: string; // ISO 8601 date format

    /**
     * Optional date indicating when the membership expires.
     * Format: ISO 8601 date string (e.g., "2025-01-01T00:00:00Z").
     */
    memberExpires?: string; // ISO 8601 date format

    /**
     * Optional loyalty points associated with the membership.
     */
    loyaltyPoints?: LoyaltyPoints;

    /**
     * Optional barcode information for quick scanning and verification.
     */
    barcode?: {
        /**
         * The type of barcode (e.g., "qrCode").
         */
        type: string; // e.g., "qrCode"

        /**
         * The value or data encoded in the barcode.
         */
        value: string;
    };

    /**
     * Optional info module data containing label-value pairs.
     */
    infoModuleData?: InfoModuleData;

    /**
     * Optional links module containing URIs to relevant web pages.
     */
    linksModuleData?: LinksModule;

    /**
     * Optional array of text modules providing additional information or messages.
     */
    textModulesData?: TextModule[];

    // Add other fields as per Google Wallet API documentation
}
