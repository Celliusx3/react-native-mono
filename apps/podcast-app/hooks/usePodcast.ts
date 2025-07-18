import { useQuery } from './useQuery';
import { ITUNES_API_HOST } from '@/constants/Api';

const fetchPodcasts = async () => {
  const response = await fetch(
    `${ITUNES_API_HOST}/search?term=react%20native&entity=podcast`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.results;
};

export const usePodcasts = () => {
  return useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts,
  });
};
