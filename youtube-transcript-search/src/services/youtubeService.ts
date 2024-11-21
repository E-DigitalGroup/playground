// src/services/youtubeService.ts

import YoutubeTranscript from 'youtube-transcript';

/**
 * Represents a single transcript entry.
 */
export interface TranscriptEntry {
  text: string;
  offset: number; // in seconds
  videoId: string;
}

/**
 * Extracts the YouTube video ID from a given URL.
 * @param urlString The YouTube video URL.
 * @returns The video ID or null if not found.
 */
export const extractVideoId = (urlString: string): string | null => {
  const patterns: RegExp[] = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = urlString.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  try {
    const parsedUrl = new URL(urlString);
    if (parsedUrl.hostname === 'www.youtube.com') {
      const videoId = parsedUrl.searchParams.get('v');
      if (videoId) {
        return videoId;
      }
    }
  } catch (e) {
    console.error('Invalid URL:', e);
  }

  return null;
};

/**
 * Fetches the transcript data for a given YouTube video ID.
 * @param videoId The YouTube video ID.
 * @returns An array of TranscriptEntry objects or null if not found.
 */
export const getTranscriptData = async (
  videoId: string
): Promise<TranscriptEntry[] | null> => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Attach videoId to each transcript entry for source URL construction
    const transcriptEntries: TranscriptEntry[] = transcript.map((entry) => ({
      text: entry.text,
      offset: entry.offset,
      videoId, // Attach the videoId for constructing source URLs later
    }));
    
    return transcriptEntries;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return null;
  }
};
