/**
 * Represents an input item for translation.
 * It can either be a text to translate or a document to translate.
 */
export type InputItem =
  | {
      /**
       * Specifies the type of input as text.
       */
      type: 'text';
      /**
       * The text content to be translated.
       */
      text: string;
      /**
       * The target language code for translation (e.g., 'es' for Spanish, 'fr' for French).
       */
      targetLang: string;
    }
  | {
      /**
       * Specifies the type of input as a document.
       */
      type: 'doc';
      /**
       * The local file path to the document to be translated.
       */
      filePath: string;
      /**
       * The target language code for translation.
       */
      targetLang: string;
    };

/**
 * Represents an output item after translation.
 * It can either be translated text or a translated document.
 */
export type OutputItem =
  | {
      /**
       * Specifies the type of output as translated text.
       */
      type: 'text';
      /**
       * The original text that was translated.
       */
      text: string;
      /**
       * The target language code for translation.
       */
      targetLang: string;
      /**
       * The translated text content.
       */
      translatedText: string;
    }
  | {
      /**
       * Specifies the type of output as a translated document.
       */
      type: 'doc';
      /**
       * The original file path of the document that was translated.
       */
      docPath: string;
      /**
       * The target language code for translation.
       */
      targetLang: string;
      /**
       * The local file path to the translated document.
       */
      translatedDocPath: string;
    };
