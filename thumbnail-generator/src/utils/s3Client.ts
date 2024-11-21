// src/utils/s3Client.ts

import AWS from 'aws-sdk';
import { logger } from './logger';

/**
 * Interface representing the configuration options for the S3 client.
 */
interface S3Config {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
}

/**
 * Interface representing the parameters required to get an object from S3.
 */
interface GetObjectParams {
  Bucket: string;
  Key: string;
}

/**
 * Interface representing the parameters required to upload an object to S3.
 */
interface UploadObjectParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType?: string;
}

/**
 * Interface representing the structure of errors thrown by S3 operations.
 */
export interface S3Error extends Error {
  code?: string;
  statusCode?: number;
  time?: string;
  retryable?: boolean;
  retryDelay?: number;
}

/**
 * Configuration object for initializing the S3 client.
 * It retrieves AWS credentials and bucket information from environment variables.
 */
const config: S3Config = {
  accessKeyId: process.env.ID || '',
  secretAccessKey: process.env.KEY || '',
  region: 'us-east-1',
  bucketName: 'mhscmedia',
};

/**
 * Validates the presence of required AWS credentials.
 * Throws an error if any credential is missing.
 */
const validateConfig = (config: S3Config): void => {
  if (!config.accessKeyId || !config.secretAccessKey) {
    throw new Error('AWS credentials (ID and KEY) must be provided via environment variables.');
  }
};

validateConfig(config);

/**
 * Initializes the AWS S3 client with the specified configuration.
 */
const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});

/**
 * Downloads an object from the specified S3 bucket.
 *
 * @param key - The key of the S3 object to retrieve.
 * @returns A promise that resolves to the S3 object data.
 *
 * @throws Will throw an error if the download fails.
 *
 * @example
 * ```typescript
 * const data = await getObject('path/to/image.jpg');
 * ```
 */
export const getObject = async (key: string): Promise<AWS.S3.GetObjectOutput> => {
  const params: GetObjectParams = { Bucket: config.bucketName, Key: key };
  logger.info('Downloading object from S3', { key, Bucket: config.bucketName });

  try {
    const data: AWS.S3.GetObjectOutput = await s3.getObject(params).promise();
    logger.info('Successfully downloaded object from S3', { key, Bucket: config.bucketName });
    return data;
  } catch (error) {
    const s3Error = error as S3Error;
    logger.error('Error downloading object from S3', { error: s3Error, key, Bucket: config.bucketName });
    throw s3Error;
  }
};

/**
 * Uploads an object to the specified S3 bucket.
 *
 * @param key - The key under which to store the new object.
 * @param body - The content of the object to be uploaded.
 * @param contentType - (Optional) The MIME type of the object.
 * @returns A promise that resolves to the data returned by S3 after a successful upload.
 *
 * @throws Will throw an error if the upload fails.
 *
 * @example
 * ```typescript
 * const uploadResult = await uploadObject('path/to/thumbnail.jpg', thumbnailBuffer, 'image/jpeg');
 * ```
 */
export const uploadObject = async (
  key: string,
  body: Buffer,
  contentType?: string
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const params: UploadObjectParams = {
    Bucket: config.bucketName,
    Key: key,
    Body: body,
    ContentType: contentType,
  };
  logger.info('Uploading object to S3', { key, Bucket: config.bucketName, contentType });

  try {
    const data: AWS.S3.ManagedUpload.SendData = await s3.upload(params).promise();
    logger.info('Successfully uploaded object to S3', { key, Bucket: config.bucketName, Location: data.Location });
    return data;
  } catch (error) {
    const s3Error = error as S3Error;
    logger.error('Error uploading object to S3', { error: s3Error, key, Bucket: config.bucketName });
    throw s3Error;
  }
};
