import { useQuery } from '@tanstack/react-query';
import { YOUTUBE_API_HOST } from '@/constants/Api';

type YouTubePlayerRequest = {
  context: {
    client: {
      clientName: string;
      clientVersion: string;
    };
  };
  videoId: string;
};

type YouTubePlayerResponse = {
  streamingData: {
    formats: {
      url: string;
      mimeType: string;
      qualityLabel: string;
    }[];
  };
  videoDetails: {
    title: string;
    author: string;
  };
};

const fetchYouTubePlayer = async (
  data: YouTubePlayerRequest
): Promise<YouTubePlayerResponse> => {
  const response = await fetch(`${YOUTUBE_API_HOST}/youtubei/v1/player`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      // Try to parse it as JSON for nice formatting
      const errorJson = JSON.parse(errorText);
      throw new Error(JSON.stringify(errorJson, null, 2));
    } catch (e) {
      // If not JSON, just throw the raw text
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }
  }

  const jsonResponse = await response.json();
  console.log(JSON.stringify(jsonResponse, null, 2));
  return jsonResponse;
};

// The hook now accepts the videoId directly
export const useYoutube = (videoId: string) => {
  const finalPayload: YouTubePlayerRequest = {
    videoId: videoId,
    context: {
      client: {
        clientName: 'ANDROID',
        clientVersion: '19.28.35',
      },
    },
  };
  return useQuery<YouTubePlayerResponse, Error>({
    // The query key MUST be unique to the request parameters
    queryKey: ['youtube', 'player', videoId],

    // The query function now calls the fetcher with the payload
    queryFn: () => fetchYouTubePlayer(finalPayload),

    // Important: This ensures the query only runs when a videoId is provided.
    enabled: !!videoId,

    // The data will be considered fresh for 24 hours.
    staleTime: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
  });
};