import { TranslationServiceClient, protos } from '@google-cloud/translate';
import { config } from '../config';
import { StorageService } from './StorageService';
import path from 'path';
import { logger } from '../utils/logger';
import { Operation } from 'google-gax';

export class DocumentTranslationService {
  private translationClient: TranslationServiceClient;
  private storageService: StorageService;
  private bucketName: string;
  private projectId: string;
  private location: string;

  /**
   * Initializes the DocumentTranslationService with Google Cloud Translation client
   * and Google Cloud Storage service.
   */
  constructor() {
    this.translationClient = new TranslationServiceClient({
      credentials: {
        private_key: config.GOOGLE_TRASLATE_PRIVATEKEY.replace(/\\n/g, '\n'),
        client_email: config.GOOGLE_TRASLATE_CLIENT_EMAIL,
      },
      projectId: config.GCP_PROJECT_ID,
    });
    this.storageService = new StorageService();
    this.bucketName = config.GCS_BUCKET_NAME;
    this.projectId = config.GCP_PROJECT_ID;
    this.location = config.GCP_LOCATION;
  }

  /**
   * Translates a document file to the target language using Google Cloud Translation API.
   * 
   * @param filePath - Local path to the document to be translated.
   * @param targetLanguage - Target language code (e.g., 'es' for Spanish).
   * @returns The local path of the translated document.
   * @throws Error if the translation process fails.
   */
  async translateDocument(filePath: string, targetLanguage: string): Promise<string> {
    try {
      // Step 1: Upload the document to the 'original' folder in GCS
      const inputGcsUri = await this.storageService.uploadFile(filePath, 'original');

      // Generate a unique output folder name in the 'translated' folder
      const outputFolderName = path.basename(filePath, path.extname(filePath));
      const outputUriPrefix = `gs://${this.bucketName}/translated/${outputFolderName}/`;

      // Prepare input configuration for the translation request
      const documentInputConfig: protos.google.cloud.translation.v3.IDocumentInputConfig = {
        gcsSource: {
          inputUri: inputGcsUri,
        },
        mimeType: this.getMimeType(filePath),
      };

      // Prepare output configuration for the translation request
      const documentOutputConfig: protos.google.cloud.translation.v3.IDocumentOutputConfig = {
        gcsDestination: {
          outputUriPrefix: outputUriPrefix,
        },
      };

      // Prepare the full translation request
      const request: protos.google.cloud.translation.v3.ITranslateDocumentRequest = {
        parent: this.translationClient.locationPath(this.projectId, this.location),
        documentInputConfig,
        documentOutputConfig,
        sourceLanguageCode: config.SOURCE_LANGUAGE,
        targetLanguageCode: targetLanguage,
        isTranslateNativePdfOnly: true, // Translate PDFs using native support
      };

      // Initiate the document translation operation
      const [operation] = await this.translationClient.translateDocument(request);
      const typedOperation = operation as Operation;

      logger.info(`Translation operation started for file: ${filePath}`);

      // Wait for the operation to complete
      await typedOperation.promise();

      logger.info(`Translation operation completed for file: ${filePath}`);

      // Step 3: Download the translated document from GCS to the local directory
      const translatedGcsUri = `${outputUriPrefix}${path.basename(filePath)}`;
      const downloadDirectory = path.dirname(filePath);
      const translatedLocalPath = await this.storageService.downloadFile(translatedGcsUri, downloadDirectory);

      return translatedLocalPath;
    } catch (error) {
      logger.error(`Error occurred while translating document ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Determines the MIME type of a file based on its extension.
   * 
   * @param filePath - Path to the file whose MIME type needs to be determined.
   * @returns The MIME type string.
   */
  private getMimeType(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
      case '.pdf':
        return 'application/pdf';
      case '.docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      default:
        return 'application/octet-stream'; // Fallback for unknown file types
    }
  }
}
