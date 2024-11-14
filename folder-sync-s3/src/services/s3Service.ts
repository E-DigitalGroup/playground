// src/services/s3Service.ts

import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    HeadObjectCommand,
  } from '@aws-sdk/client-s3';
  import executeWithRetry from '../utils/retry';
  import logger from '../utils/logger';
  import config from '../config';
  
  /**
   * Initializes the AWS S3 client with the provided configuration.
   */
  const s3Client: S3Client = new S3Client({
    region: config.S3_REGION,
    credentials: {
      accessKeyId: config.S3_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: config.S3_BUCKET_SECRET_ACCESS_KEY,
    },
  });
  
  /**
   * Checks if an object exists in the S3 bucket.
   *
   * @param {string} key - The S3 object key.
   * @returns {Promise<boolean>} - Resolves to true if the object exists, false otherwise.
   */
  export const checkExists = async (key: string): Promise<boolean> => {
    try {
      await s3Client.send(new HeadObjectCommand({ Key: key, Bucket: config.S3_BUCKET_NAME }));
      return true;
    } catch (error: any) {
      if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
        return false;
      }
      logger.error(`Error checking existence of ${key}: ${error.message}`);
      throw error;
    }
  };
  
  /**
   * Uploads a file to S3 if it doesn't already exist.
   *
   * @param {Buffer} fileContent - The content of the file.
   * @param {string} key - The S3 object key.
   * @returns {Promise<void>}
   */
  export const uploadFile = async (fileContent: Buffer, key: string): Promise<void> => {
    await executeWithRetry(
      () =>
        s3Client.send(
          new PutObjectCommand({
            Key: key,
            Bucket: config.S3_BUCKET_NAME,
            Body: fileContent,
          })
        ),
      3, // Number of retries
      1000 // Minimum timeout in ms
    );
    logger.info(`Upload Successful: ${key}`);
  };
  
  /**
   * Removes a file from S3.
   *
   * @param {string} key - The S3 object key.
   * @returns {Promise<void>}
   */
  export const removeFile = async (key: string): Promise<void> => {
    await executeWithRetry(
      () => s3Client.send(new DeleteObjectCommand({ Key: key, Bucket: config.S3_BUCKET_NAME })),
      3,
      1000
    );
    logger.info(`Removal Successful: ${key}`);
  };
  

  