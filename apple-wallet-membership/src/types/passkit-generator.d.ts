// src/types/passkit-generator.d.ts

declare module 'passkit-generator' {
    import { Buffer } from 'buffer';

    /**
     * Interface for Signer Key Configuration
     */
    export interface SignerKey {
        /**
         * Path to the private key file (.pem) or Buffer containing the key.
         */
        keyFile: string | Buffer;

        /**
         * Passphrase for the private key if it is encrypted. Optional.
         */
        passphrase?: string;
    }

    /**
     * Interface for Certificates Configuration
     */
    export interface Certificates {
        /**
         * Apple WWDR (Worldwide Developer Relations) certificate content as a string or Buffer.
         */
        wwdr: string | Buffer;

        /**
         * Pass Type ID certificate content as a string or Buffer.
         */
        signerCert: string | Buffer;

        /**
         * Signer key configuration containing the private key and optional passphrase.
         */
        signerKey: SignerKey;
    }

    /**
     * Interface for PKPass Constructor Options
     */
    export interface PKPassOptions {
        /**
         * Pass template JSON object defining the static structure of the pass.
         */
        model: object;

        /**
         * Certificates required for signing the pass.
         */
        certificates: Certificates;

        /**
         * Dynamic data to override or extend the pass template. Optional.
         */
        overrides?: object;
    }

    /**
     * PKPass Class
     * 
     * Represents an Apple Wallet pass and provides methods to add images and generate the `.pkpass` file.
     */
    export class PKPass {
        /**
         * Constructs a new PKPass instance.
         * 
         * @param options - Configuration options for the pass.
         */
        constructor(options: PKPassOptions);

        /**
         * Images associated with the pass. Provides a method to add images.
         */
        images: {
            /**
             * Adds an image to the pass.
             * 
             * @param key - The image type key (e.g., "icon", "logo").
             * @param buffer - Buffer containing the image data.
             */
            add: (key: string, buffer: Buffer) => void;
        };

        /**
         * Generates the signed `.pkpass` file.
         * 
         * @returns A promise that resolves to a Buffer containing the `.pkpass` data.
         */
        generate: () => Promise<Buffer>;
    }
}
