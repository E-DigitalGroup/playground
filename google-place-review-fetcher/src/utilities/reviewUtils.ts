// src/utilities/reviewUtils.ts

import { Review } from '../types/interfaces';

/**
 * Formats a single Review object into a human-readable string.
 *
 * @param {Review} review - The review object to format.
 * @returns {string} A formatted string containing the review details.
 *
 * @example
 * ```typescript
 * const review: Review = {
 *   author_name: "Jane Doe",
 *   rating: 5,
 *   text: "Excellent service and friendly staff!",
 *   time: 1618307200
 * };
 * 
 * console.log(formatReview(review));
 * ```
 *
 * @returns A string formatted as:
 * ```
 * Author: Jane Doe
 * Rating: 5
 * Date: 04/13/2021
 * Review: Excellent service and friendly staff!
 * ```
 */
export const formatReview = (review: Review): string => {
  // Convert Unix timestamp to a human-readable date string
  const date: string = new Date(review.time * 1000).toLocaleDateString();

  // Construct the formatted review string
  return `
Author: ${review.author_name}
Rating: ${review.rating}
Date: ${date}
Review: ${review.text}
  `.trim();
};

/**
 * Processes an array of Review objects by formatting each review.
 *
 * @param {Review[]} reviews - An array of Review objects to process.
 * @returns {string[]} An array of formatted review strings.
 *
 * @example
 * ```typescript
 * const reviews: Review[] = [
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
 * ];
 * 
 * const formattedReviews = processReviews(reviews);
 * formattedReviews.forEach(review => console.log(review));
 * ```
 *
 * @returns An array of strings, each representing a formatted review.
 * ```
 * Author: Jane Doe
 * Rating: 5
 * Date: 04/13/2021
 * Review: Excellent service and friendly staff!
 * 
 * Author: John Smith
 * Rating: 4
 * Date: 04/14/2021
 * Review: Great location but the prices are a bit high.
 * ```
 */
export const processReviews = (reviews: Review[]): string[] => {
  return reviews.map(formatReview);
};
