// src/utils/imageProcessor.ts

import sharp from 'sharp';
import { logger } from './logger';

/**
 * Configuration options for thumbnail creation.
 */
interface ThumbnailOptions {
  /**
   * The width to resize the image to while maintaining aspect ratio.
   * Defaults to 800 pixels if not specified.
   */
  width?: number;

  /**
   * The desired image format for the thumbnail.
   * Supported formats: 'jpeg', 'png', 'webp', etc.
   * If not specified, the original image format is retained.
   */
  format?: 'jpeg' | 'png' | 'webp';
}

/**
 * Creates a thumbnail from the provided image buffer using Sharp.
 *
 * This function resizes the input image to the specified width while maintaining
 * the aspect ratio. Optionally, it can convert the image to a different format.
 *
 * @param inputBuffer - The original image buffer to process.
 * @param options - Configuration options for thumbnail creation.
 * @returns A promise that resolves to the thumbnail image buffer.
 *
 * @throws Will throw an error if image processing fails.
 *
 * @example
 * ```typescript
 * import { createThumbnail } from './utils/imageProcessor';
 * 
 * const originalImageBuffer = // obtain buffer from S3 or other source
 * const thumbnailBuffer = await createThumbnail(originalImageBuffer, { width: 800, format: 'webp' });
 * ```
 */
export const createThumbnail = async (
  inputBuffer: Buffer,
  options: ThumbnailOptions = {}
): Promise<Buffer> => {
  const { width = 800, format } = options;

  logger.info('Starting thumbnail creation with Sharp', { width, format });

  try {
    // Initialize the Sharp instance with the input buffer
    let image = sharp(inputBuffer).resize(width);

    // Conditionally apply format conversion if specified
    if (format) {
      image = image.toFormat(format);
      logger.info(`Converting image format to ${format}`);
    }

    // Process the image and obtain the thumbnail buffer
    const thumbnailBuffer: Buffer = await image.toBuffer();

    logger.info('Thumbnail successfully created');
    return thumbnailBuffer;
  } catch (error) {
    logger.error('Error processing image with Sharp', { error });
    throw error; // Rethrow the error to be handled by the caller
  }
};
