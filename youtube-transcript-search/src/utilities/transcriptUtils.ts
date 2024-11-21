// src/utilities/transcriptUtils.ts

import _ from 'lodash';
import he from 'he';
import { TranscriptEntry } from '../services/youtubeService';

/**
 * Represents the metadata associated with each transcript chunk.
 */
export interface ChunkMetadata {
  offset: number; // in seconds
  source: string; // YouTube embed URL with start time
}

/**
 * Represents a single chunked document derived from the transcript.
 */
export interface ChunkDocument {
  pageContent: string; // The text content of the chunk
  metadata: ChunkMetadata; // Metadata about the chunk
}

const SPLIT_TIME = 30; // seconds
const OVERLAP_TIME = 10; // seconds

/**
 * Splits the transcript into chunks based on SPLIT_TIME and OVERLAP_TIME.
 * Each chunk overlaps with the previous one by OVERLAP_TIME seconds to ensure continuity.
 *
 * @param transcript - Array of TranscriptEntry objects.
 * @param allDocs - Accumulator for the chunked documents (used internally for recursion).
 * @param firstIndex - Starting index for the current chunk.
 * @param lastIndex - Ending index for the current chunk.
 * @returns An array of ChunkDocument objects representing the chunked transcript.
 */
export const createChunks = (
  transcript: TranscriptEntry[],
  allDocs: ChunkDocument[] = [],
  firstIndex: number = 0,
  lastIndex: number = 0
): ChunkDocument[] => {
  // Determine the starting index; default to 0 if not provided
  const fIndex: number = firstIndex || 0;

  // Determine the ending index based on SPLIT_TIME
  const lIndex: number =
    lastIndex !== undefined
      ? lastIndex
      : _.findIndex(transcript, (o) => o.offset >= SPLIT_TIME);

  // If the starting index is invalid or beyond the transcript length, return the accumulated documents
  if (fIndex === -1 || fIndex >= transcript.length) {
    return allDocs;
  }

  // Aggregate the text for the current chunk
  let text: string = '';
  for (let i = fIndex; i <= lIndex && i < transcript.length; i += 1) {
    text += ` ${transcript[i].text}`;
  }

  // Decode HTML entities and remove any text within square brackets (e.g., [Music])
  const cleanedText: string = he.decode(text.replace(/\[.*?\]/g, '').trim());

  // Create the chunked document with metadata
  const chunk: ChunkDocument = {
    pageContent: he.decode(cleanedText),
    metadata: {
      offset: transcript[fIndex].offset,
      source: `https://www.youtube.com/embed/${transcript[fIndex].videoId}?start=${Math.floor(
        transcript[fIndex].offset
      )}`,
    },
  };

  // Add the chunk to the accumulator
  allDocs.push(chunk);

  // If we've reached the end of the transcript, return the accumulated documents
  if (lIndex >= transcript.length - 1) {
    return allDocs;
  } else {
    // Find the next starting index based on OVERLAP_TIME
    const nextFirstIndex: number = _.findIndex(
      transcript,
      (o) => o.offset >= transcript[fIndex].offset + OVERLAP_TIME,
      lIndex + 1
    );

    // Find the next ending index based on OVERLAP_TIME
    const nextLastIndex: number = _.findIndex(
      transcript,
      (o) => o.offset >= transcript[lIndex].offset + OVERLAP_TIME,
      nextFirstIndex
    );

    // Recursively create the next chunk
    return createChunks(
      transcript,
      allDocs,
      nextFirstIndex,
      nextLastIndex === -1 ? transcript.length - 1 : nextLastIndex
    );
  }
};
