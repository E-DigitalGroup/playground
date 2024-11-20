// src/services/googleService.ts

import axios, { AxiosResponse } from 'axios';
import { PlaceReviewResponse } from '../types/interfaces';
import { logger } from '../utilities/logger';

/**
 * GoogleService is responsible for interacting with the Google Places API.
 * It provides methods to fetch place details, including reviews.
 */
export class GoogleService {
  /**
   * The API key used to authenticate requests to the Google Places API.
   */
  private apiKey: string;

  /**
   * Constructs an instance of GoogleService.
   * @param apiKey - Your Google Places API key.
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Fetches reviews for a specific place using the Google Places API.
   * 
   * @param placeId - The unique identifier for the place whose reviews are to be fetched.
   * @returns A promise that resolves to a PlaceReviewResponse containing the reviews and status.
   * 
   * @throws Will throw an error if the API request fails or returns a non-OK status.
   */
  public async fetchPlaceReviews(placeId: string): Promise<PlaceReviewResponse> {
    // Google Places Details API endpoint
    const url: string = 'https://maps.googleapis.com/maps/api/place/details/json';

    // Parameters for the API request
    const params: Record<string, string> = {
      place_id: placeId,
      key: this.apiKey,
      fields: 'reviews', // Ensure 'reviews' is plural to fetch the reviews field
    };

    try {
      // Log the initiation of the API request
      logger.info(`Fetching reviews for Place ID: ${placeId}`);

      // Make the GET request to the Google Places API
      const response: AxiosResponse<any> = await axios.get(url, { params });

      // Check if the API response status is OK
      if (response.data.status !== 'OK') {
        // Log the API error status
        logger.error(`Google Places API error: ${response.data.status}`);

        // Throw an error with the API status message
        throw new Error(`Google Places API error: ${response.data.status}`);
      }

      // Extract reviews from the API response, defaulting to an empty array if undefined
      const reviews: PlaceReviewResponse['reviews'] = response.data.result.reviews || [];

      // Log the number of reviews fetched
      logger.info(`Fetched ${reviews.length} reviews.`);

      // Return the structured response
      return { reviews, status: response.data.status };
    } catch (error: unknown) {
      // Handle and log unexpected errors
      if (axios.isAxiosError(error)) {
        // Axios-specific error handling
        logger.error(`Axios error while fetching place reviews: ${error.message}`);
        throw new Error(`Axios error: ${error.message}`);
      } else if (error instanceof Error) {
        // General error handling
        logger.error(`Unexpected error while fetching place reviews: ${error.message}`);
        throw error;
      } else {
        // Handle non-Error throwables
        logger.error('An unknown error occurred while fetching place reviews.');
        throw new Error('An unknown error occurred.');
      }
    }
  }
}
