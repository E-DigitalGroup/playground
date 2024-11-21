import { InputItem, OutputItem } from './types';
import { TranslationService } from './services/TranslationService';
import { DocumentTranslationService } from './services/DocumentTranslationService';
import { logger } from './utils/logger';
import path from 'path';
import fs from 'fs';

// Initialize translation services
const translationService = new TranslationService(); // Service for translating text
const documentTranslationService = new DocumentTranslationService(); // Service for translating documents

// Define the input array of items to translate
const input: InputItem[] = [
  { type: 'text', text: 'Hello, world!', targetLang: 'es' }, // Text to translate to Spanish
  { type: 'doc', filePath: './documents/sample.pdf', targetLang: 'fr' }, // Document to translate to French
  // Add more items as needed
];

// Initialize the output array to store results
const output: OutputItem[] = [];

// Validate that all document file paths in the input array exist
for (const item of input) {
  if (item.type === 'doc' && !fs.existsSync(item.filePath)) {
    logger.error(`File not found: ${item.filePath}`);
    process.exit(1); // Exit the process if a file is missing
  }
}

/**
 * Main function to process translations for all input items.
 */
async function processTranslations() {
  for (const item of input) {
    if (item.type === 'text') {
      // Handle text translation
      try {
        const translatedText = await translationService.translateText(item.text, item.targetLang); // Translate the text
        const outputItem: OutputItem = {
          ...item, // Copy input details
          translatedText, // Add translated text
        };
        output.push(outputItem); // Store the result in the output array
        logger.info(`Translated text: "${item.text}" -> "${translatedText}"`);
      } catch (error) {
        logger.error(`Failed to translate text: "${item.text}"`, error);
      }
    } else if (item.type === 'doc') {
      // Handle document translation
      try {
        const translatedDocPath = await documentTranslationService.translateDocument(
          item.filePath,
          item.targetLang
        ); // Translate the document
        const outputItem: OutputItem = {
          type: 'doc', // Specify the output type as a document
          docPath: item.filePath, // Original file path
          targetLang: item.targetLang, // Target language
          translatedDocPath, // Path to the translated document
        };
        output.push(outputItem); // Store the result in the output array
        logger.info(`Translated document saved at: ${translatedDocPath}`);
      } catch (error) {
        logger.error(`Failed to translate document: "${item.filePath}"`, error);
      }
    }
  }

  // Log the final output array containing all translations
  console.log('Final Output:', output);
}

// Execute the translation process
processTranslations().catch((error) => {
  logger.error('An unexpected error occurred:', error); // Log unexpected errors
});
