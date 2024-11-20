// src/index.ts

import { config } from './config/config';
import { GoogleService } from './services/googleService';
import { processReviews } from './utilities/reviewUtils';
import { logger } from './utilities/logger';

/**
 * The main function that orchestrates fetching and displaying Google Place reviews.
 *
 * @async
 * @function run
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws Will log and exit the process if essential configuration variables are missing.
 * @throws Will log any errors encountered during the fetching and processing of reviews.
 *
 * @example
 * ```typescript
 * run();
 * ```
 */
const run = async (): Promise<void> => {
  // Validate the presence of the Google API key
  if (!config.googleApiKey) {
    logger.error('Google API key is missing. Please set GOOGLE_API_KEY in the .env file.');
    process.exit(1);
  }

  // Validate the presence of the Place ID
  if (!config.placeId) {
    logger.error('Place ID is missing. Please set PLACE_ID in the .env file.');
    process.exit(1);
  }

  // Initialize the GoogleService with the provided API key
  const googleService: GoogleService = new GoogleService(config.googleApiKey);

  try {
    // Fetch reviews for the specified Place ID
    const { reviews } = await googleService.fetchPlaceReviews(config.placeId);

    // Process and format the fetched reviews
    const formattedReviews: string[] = processReviews(reviews);

    // Display the formatted reviews in the console
    console.log('--- Place Reviews ---');
    formattedReviews.forEach((review: string, index: number) => {
      console.log(`Review ${index + 1}:\n${review}\n`);
    });
  } catch (error: unknown) {
    // Handle and log errors appropriately
    if (error instanceof Error) {
      logger.error(`Application error: ${error.message}`);
    } else {
      logger.error('An unknown error occurred during the application execution.');
    }
  }
};

// Execute the main function
run();
