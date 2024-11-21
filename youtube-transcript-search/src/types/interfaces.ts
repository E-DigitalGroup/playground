// src/types/interfaces.ts

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
  