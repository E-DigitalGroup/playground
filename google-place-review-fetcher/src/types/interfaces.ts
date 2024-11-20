// src/types/interfaces.ts

/**
 * Represents a single review retrieved from the Google Places API.
 */
export interface Review {
    /**
     * The name of the author who wrote the review.
     * 
     * @example "Jane Doe"
     */
    author_name: string;

    /**
     * The rating given by the author.
     * 
     * @remarks
     * The rating is an integer value between 1 and 5, where 5 indicates the highest level of satisfaction.
     * 
     * @example 4
     */
    rating: number;

    /**
     * The textual content of the review.
     * 
     * @remarks
     * This field contains the author's detailed feedback about their experience.
     * It may include comments on the quality of service, ambiance, products, or any other relevant aspects.
     * 
     * @example "The ambiance was fantastic, and the staff were exceptionally friendly."
     */
    text: string;

    /**
     * The timestamp indicating when the review was submitted.
     * 
     * @remarks
     * The time is represented as a Unix timestamp, which counts the number of seconds that have elapsed since January 1, 1970 (UTC).
     * This can be converted to a human-readable date format as needed.
     * 
     * @example 1618307200
     */
    time: number;
}

/**
 * Represents the response structure when fetching place reviews from the Google Places API.
 */
export interface PlaceReviewResponse {
    /**
     * An array of reviews associated with the specified place.
     * 
     * @remarks
     * Each review provides insights into customer experiences and ratings.
     * This array may be empty if there are no reviews available for the place.
     * 
     * @example
     * [
     *   {
     *     author_name: "Jane Doe",
     *     rating: 5,
     *     text: "Excellent service and friendly staff!",
     *     time: 1618307200
     *   },
     *   {
     *     author_name: "John Smith",
     *     rating: 4,
     *     text: "Great location but the prices are a bit high.",
     *     time: 1618393600
     *   }
     * ]
     */
    reviews: Review[];

    /**
     * The status of the API request.
     * 
     * @remarks
     * This field indicates whether the request was successful and if the expected data was returned.
     * Possible values include:
     * - "OK": The request was successful, and results were returned.
     * - "ZERO_RESULTS": No results were found for the given query.
     * - "OVER_QUERY_LIMIT": The requestor has exceeded the quota.
     * - "REQUEST_DENIED": The request was denied, possibly due to missing or invalid API key.
     * - "INVALID_REQUEST": The request was malformed or missing required parameters.
     * - "UNKNOWN_ERROR": An unknown error occurred; the request may be successful if tried again.
     * 
     * @example "OK"
     */
    status: string;
}
