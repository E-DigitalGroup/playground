// types/youtube-transcript.d.ts

declare module 'youtube-transcript' {
    export interface TranscriptSegment {
      text: string;
      offset: number; // in seconds
    }
  
    export default class YoutubeTranscript {
      /**
       * Fetches the transcript for a given YouTube video ID.
       * @param videoId The YouTube video ID.
       * @returns A promise that resolves to an array of TranscriptSegment objects.
       */
      static fetchTranscript(videoId: string): Promise<TranscriptSegment[]>;
    }
  }
  