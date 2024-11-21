import { Storage } from '@google-cloud/storage';
import { config } from '../config';
import path from 'path';
import fs from 'fs';
import { logger } from '../utils/logger';

export class StorageService {
  private storage: Storage;
  private bucketName: string;

  /**
   * Initializes the StorageService with Google Cloud Storage client
   * and the bucket configuration.
   */
  constructor() {
    this.storage = new Storage({
      credentials: {
        private_key: config.GOOGLE_TRASLATE_PRIVATEKEY.replace(/\\n/g, '\n'),
        client_email: config.GOOGLE_TRASLATE_CLIENT_EMAIL,
      },
      projectId: config.GCP_PROJECT_ID,
    });
    this.bucketName = config.GCS_BUCKET_NAME;
  }

  /**
   * Uploads a file from the local filesystem to Google Cloud Storage.
   *
   * @param localFilePath - The local path of the file to be uploaded.
   * @param destinationFolder - The destination folder in the GCS bucket.
   * @returns The GCS URI of the uploaded file.
   * @throws Error if the file upload fails.
   */
  async uploadFile(localFilePath: string, destinationFolder: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const fileName = path.basename(localFilePath);
    const destination = `${destinationFolder}/${fileName}`;

    try {
      await bucket.upload(localFilePath, { destination: destination });
      const gcsUri = `gs://${this.bucketName}/${destination}`;
      logger.info(`Uploaded ${fileName} to ${gcsUri}`);
      return gcsUri;
    } catch (error) {
      logger.error(`Error uploading file ${fileName}:`, error);
      throw error;
    }
  }

  /**
   * Downloads a file from Google Cloud Storage to the local filesystem.
   *
   * @param gcsUri - The GCS URI of the file to be downloaded.
   * @param downloadDirectory - The local directory where the file will be saved.
   * @returns The local path of the downloaded file.
   * @throws Error if the file download fails.
   */
  async downloadFile(gcsUri: string, downloadDirectory: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const filePath = gcsUri.replace(`gs://${this.bucketName}/`, '');
    const fileName = path.basename(filePath);
    const localFilePath = path.join(downloadDirectory, fileName);

    try {
      await bucket.file(filePath).download({ destination: localFilePath });
      logger.info(`Downloaded file to ${localFilePath}`);
      return localFilePath;
    } catch (error) {
      logger.error(`Error downloading file ${fileName}:`, error);
      throw error;
    }
  }

  /**
   * Lists files in a Google Cloud Storage bucket with an optional prefix.
   *
   * @param prefix - The prefix to filter files by (e.g., folder path).
   * @returns An array of file names in the bucket that match the prefix.
   * @throws Error if listing files fails.
   */
  async listFiles(prefix: string = ''): Promise<string[]> {
    const bucket = this.storage.bucket(this.bucketName);
    try {
      const [files] = await bucket.getFiles({ prefix });
      const fileNames = files.map(file => file.name);
      logger.info(`Listed ${fileNames.length} files with prefix '${prefix}'`);
      return fileNames;
    } catch (error) {
      logger.error('Error listing files:', error);
      throw error;
    }
  }
}
