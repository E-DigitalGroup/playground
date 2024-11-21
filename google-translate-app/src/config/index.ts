import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

// Export configuration object
export const config = {
  // Google Cloud application credentials
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_WALLET_PRIVATEKEY || '',

  // Google Translate API credentials
  GOOGLE_TRASLATE_PRIVATEKEY: process.env.GOOGLE_TRASLATE_PRIVATEKEY || '',
  GOOGLE_TRASLATE_CLIENT_EMAIL: process.env.GOOGLE_TRASLATE_CLIENT_EMAIL || '',

  // Google Cloud Storage configuration
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME || '',

  // Google Cloud Platform project details
  GCP_PROJECT_ID: process.env.GCP_PROJECT_ID || '',
  GCP_LOCATION: process.env.GCP_LOCATION || 'us-central1',

  // Source language for translations
  SOURCE_LANGUAGE: process.env.SOURCE_LANGUAGE || 'en',
};
