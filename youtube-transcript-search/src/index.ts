// src/index.ts

import logger from './utilities/logger';
import { extractVideoId, getTranscriptData, TranscriptEntry } from './services/youtubeService';
import { createChunks, ChunkDocument } from './utilities/transcriptUtils';

/**
 * Represents the search parameters.
 */
interface SearchObject {
  video: string;
  search: string;
  score?: number;
}

/**
 * Represents the structure of the search result.
 */
interface SearchResult {
  content: string;
  source: string;
  offset: number;
}

/**
 * Static object containing the YouTube link and search query.
 * 
 * @property {string} video - The YouTube video URL.
 * @property {string} search - The text to search within the video transcript.
 * @property {number} [score] - Optional: Threshold score for filtering results.
 */
const staticObj: SearchObject = {
  video: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // Replace with actual YouTube URL
  search: 'Some text which will search in video', // Replace with your search query
  score: 0.5, // Optional: threshold score for filtering (not used in simple search)
};

/**
 * Searches for the query text within the transcript chunks.
 * 
 * @param {ChunkDocument[]} chunks - Array of chunked transcript documents.
 * @param {string} query - The search query string.
 * @returns {SearchResult[]} - Array of matching search results.
 */
const searchTranscript = (chunks: ChunkDocument[], query: string): SearchResult[] => {
  const lowerCaseQuery = query.toLowerCase();

  return chunks
    .filter((chunk) => chunk.pageContent.toLowerCase().includes(lowerCaseQuery))
    .map((chunk) => ({
      content: chunk.pageContent,
      source: chunk.metadata.source,
      offset: chunk.metadata.offset,
    }));
};

/**
 * Main function that orchestrates the transcript fetching, chunking, and searching.
 */
const main = async () => {
  const { video, search } = staticObj;

  logger.info('Starting transcript search process.');
  logger.debug(`Video URL: ${video}`);
  logger.debug(`Search Query: ${search}`);

  // Extract video ID from the provided YouTube URL
  const videoId = extractVideoId(video);
  if (!videoId) {
    logger.error('Invalid YouTube URL provided.');
    return;
  }

  logger.info(`Extracted Video ID: ${videoId}`);

  // Fetch transcript data for the extracted video ID
  const transcriptData: TranscriptEntry[] | null = await getTranscriptData(videoId);
  if (!transcriptData) {
    logger.error('Transcript data not found for the provided video.');
    return;
  }

  logger.info('Transcript data fetched successfully.');

  // Create chunks from the transcript data
  const chunks: ChunkDocument[] = createChunks(transcriptData);
  logger.info(`Transcript split into ${chunks.length} chunks.`);

  // Perform search on the transcript chunks
  const results: SearchResult[] = searchTranscript(chunks, search);
  logger.info(`Found ${results.length} matching results.`);

  // Display search results
  if (results.length === 0) {
    logger.warn('No matching results found.');
  } else {
    logger.info('Search Results:');
    results.forEach((result, index) => {
      logger.info(`\nResult ${index + 1}:`);
      logger.info(`Source: ${result.source}`);
      logger.info(`Offset: ${result.offset} seconds`);
      logger.info(`Content: ${result.content}`);
    });
  }
};

// Execute the main function and handle any uncaught errors
main().catch((error) => {
  logger.error('An unexpected error occurred:', error);
});
