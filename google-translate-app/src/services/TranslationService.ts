import { TranslationServiceClient } from '@google-cloud/translate';
import { config } from '../config';
import { logger } from '../utils/logger';

export class TranslationService {
  private client: TranslationServiceClient;

  /**
   * Initializes the TranslationService with Google Cloud Translation client.
   */
  constructor() {
    this.client = new TranslationServiceClient({
      credentials: {
        private_key: config.GOOGLE_TRASLATE_PRIVATEKEY.replace(/\\n/g, '\n'),
        client_email: config.GOOGLE_TRASLATE_CLIENT_EMAIL,
      },
      projectId: config.GCP_PROJECT_ID,
    });
  }

  /**
   * Translates a given text to the specified target language using Google Cloud Translation API.
   *
   * @param text - The text content to be translated.
   * @param targetLanguage - The target language code (e.g., 'es' for Spanish, 'fr' for French).
   * @returns The translated text.
   * @throws Error if the translation request fails.
   */
  async translateText(text: string, targetLanguage: string): Promise<string> {
    // Construct the translation request
    const request = {
      parent: this.client.locationPath(config.GCP_PROJECT_ID, config.GCP_LOCATION),
      contents: [text], // Array of text contents to translate
      mimeType: 'text/plain', // MIME type of the text (plain text in this case)
      sourceLanguageCode: config.SOURCE_LANGUAGE, // Source language code from config
      targetLanguageCode: targetLanguage, // Target language code
    };

    try {
      // Send the translation request to the Google Cloud Translation API
      const [response] = await this.client.translateText(request);

      // Extract the translated text from the API response
      const translatedText = response.translations?.[0].translatedText || '';

      logger.info(`Translated text to ${targetLanguage}: ${translatedText}`);
      return translatedText;
    } catch (error) {
      logger.error('Error translating text:', error);
      throw error;
    }
  }
}
