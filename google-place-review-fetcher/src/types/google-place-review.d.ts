// types/google-place-review.d.ts

/**
 * Module: google-place-review
 * 
 * This module provides functionalities to fetch reviews for a specific place
 * from the Google Places API. It exports functions that interact with the API
 * to retrieve and process place reviews.
 */
declare module 'google-place-review' {
    import { PlaceReviewResponse } from '../src/types/interfaces';

    /**
     * Fetches reviews for a specified place using the Google Places API.
     * 
     * @param placeId - A string representing the unique identifier of the place
     *                   for which reviews are to be fetched. This ID can be obtained
     *                   using the Place ID Finder tool provided by Google.
     * @param apiKey - A string containing the Google API key used to authenticate
     *                 requests to the Google Places API. Ensure that this key has
     *                 the necessary permissions and is kept secure.
     * 
     * @returns A Promise that resolves to a `PlaceReviewResponse` object. This object
     *          contains an array of reviews (`reviews`) and the status (`status`) of the
     *          API request. The `PlaceReviewResponse` interface is defined in
     *          `../src/types/interfaces.ts`.
     * 
     * @throws Will throw an error if the API request fails due to network issues,
     *         invalid parameters, or if the Google Places API returns a status
     *         other than 'OK'. Ensure to handle these errors appropriately when
     *         invoking this function.
     * 
     * @example
     * ```typescript
     * import { fetchPlaceReviews } from 'google-place-review';
     * 
     * const placeId = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
     * const apiKey = 'YOUR_GOOGLE_API_KEY';
     * 
     * fetchPlaceReviews(placeId, apiKey)
     *   .then(response => {
     *     console.log('Place Reviews:', response.reviews);
     *   })
     *   .catch(error => {
     *     console.error('Error fetching place reviews:', error);
     *   });
     * ```
     */
    export function fetchPlaceReviews(placeId: string, apiKey: string): Promise<PlaceReviewResponse>;
}
