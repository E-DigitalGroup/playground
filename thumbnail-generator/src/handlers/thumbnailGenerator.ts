// src/handlers/thumbnailGenerator.ts

import { S3Handler, S3Event, S3EventRecord } from 'aws-lambda';
import { getObject, uploadObject, S3Error } from '../utils/s3Client';
import { createThumbnail } from '../utils/imageProcessor';
import { logger } from '../utils/logger';

/**
 * Supported image file extensions for thumbnail generation.
 */
const imageExtensions: string[] = ['.jpg', '.jpeg', '.png', '.webp'];

/**
 * Checks if a given file name has a supported image extension.
 *
 * @param fileName - The name of the file to check.
 * @returns `true` if the file is an image; otherwise, `false`.
 */
const isImage = (fileName: string): boolean => {
  const fileExtension: string = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
  return imageExtensions.includes(fileExtension);
};

/**
 * AWS Lambda handler for processing S3 events to generate thumbnails.
 *
 * This handler listens to S3 events, validates the incoming objects, generates thumbnails
 * for supported images, and uploads the thumbnails back to S3.
 *
 * @param event - The S3 event that triggered the Lambda function.
 */
export const handler: S3Handler = async (event: S3Event): Promise<void> => {
  logger.info('Received S3 event', { event });

  // Validate that the event contains records
  if (!event.Records || event.Records.length === 0) {
    logger.error('No records found in the S3 event');
    return; // Exit early as there's nothing to process
  }

  // Process each record in the event
  for (const record of event.Records) {
    try {
      // Extract the S3 object key from the event record
      const sourceKey: string = decodeURIComponent(
        record.s3.object.key.replace(/\+/g, ' ')
      );

      // Define the target key by replacing 'images' with 'thumbnails' in the source key
      const targetKey: string = sourceKey.replace(/images/g, 'thumbnails');
      // Uncomment the following lines if you want to change the image format to WebP
      // .replace(/\.jpg$/i, '.webp')
      // .replace(/\.jpeg$/i, '.webp')
      // .replace(/\.png$/i, '.webp');

      // Skip processing if the file is not an image
      if (!isImage(sourceKey)) {
        logger.info('Skipping processing: File is not a supported image', { sourceKey });
        continue; // Move to the next record
      }

      // Skip processing if the source key does not contain '/images/'
      if (!sourceKey.includes('/images/')) {
        logger.info('Skipping processing: Source key does not include /images/', { sourceKey });
        continue; // Move to the next record
      }

      logger.info('Initializing thumbnail generation', { sourceKey, targetKey });

      // Download the image from S3
      const inputData: AWS.S3.GetObjectOutput = await getObject(sourceKey);
      if (!inputData.Body) {
        throw new Error('S3 object has no body');
      }

      // Create a thumbnail from the downloaded image buffer
      const thumbnailBuffer: Buffer = await createThumbnail(inputData.Body as Buffer);

      // Determine the content type based on the original file extension
      const fileExtension: string = sourceKey.substring(sourceKey.lastIndexOf('.')).toLowerCase();
      const contentTypeMap: Record<string, string> = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.webp': 'image/webp',
      };
      const contentType: string = contentTypeMap[fileExtension] || 'image/jpeg';

      // Upload the generated thumbnail back to S3
      await uploadObject(targetKey, thumbnailBuffer, contentType);

      logger.info('Thumbnail successfully created and uploaded', { sourceKey, targetKey });
    } catch (error) {
      // Type assertion to S3Error for better error handling
      const s3Error = error as S3Error;
      logger.error('Error processing thumbnail', { error: s3Error, record });
      // Rethrow the error to trigger Lambda's retry mechanism if configured
      throw s3Error;
    }
  }
};
