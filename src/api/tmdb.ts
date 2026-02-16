import axios from 'axios';
import type {
  MediaItem,
  MovieDetails,
  TMDBListResponse,
  TVDetails,
  TVSeasonDetails,
} from '../types/tmdb';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Missing VITE_TMDB_API_KEY. Add it to your .env file.');
}

const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US',
  },
});

const withMediaType = (items: MediaItem[], mediaType: 'movie' | 'tv') =>
  items.map((item) => ({ ...item, media_type: item.media_type ?? mediaType }));

export const tmdbApi = {
  trendingMovies: async () => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/trending/movie/week');
    return withMediaType(data.results, 'movie');
  },

  popularMovies: async () => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/movie/popular');
    return withMediaType(data.results, 'movie');
  },

  popularTV: async () => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/tv/popular');
    return withMediaType(data.results, 'tv');
  },

  topRatedMovies: async () => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/movie/top_rated');
    return withMediaType(data.results, 'movie');
  },

  moviesByGenre: async (genreId: number) => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/discover/movie', {
      params: { with_genres: genreId },
    });
    return withMediaType(data.results, 'movie');
  },

  searchMulti: async (query: string, page = 1) => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>('/search/multi', {
      params: { query, page, include_adult: false },
    });
    return {
      ...data,
      results: data.results.filter((item) => item.media_type === 'movie' || item.media_type === 'tv'),
    };
  },

  movieDetails: async (id: string) => {
    const { data } = await tmdbClient.get<MovieDetails>(`/movie/${id}`);
    return { ...data, media_type: 'movie' as const };
  },

  movieRecommendations: async (id: string) => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>(`/movie/${id}/recommendations`);
    return withMediaType(data.results, 'movie');
  },

  tvDetails: async (id: string) => {
    const { data } = await tmdbClient.get<TVDetails>(`/tv/${id}`);
    return { ...data, media_type: 'tv' as const };
  },

  tvSeasonDetails: async (id: string, season: number) => {
    const { data } = await tmdbClient.get<TVSeasonDetails>(`/tv/${id}/season/${season}`);
    return data;
  },

  tvRecommendations: async (id: string) => {
    const { data } = await tmdbClient.get<TMDBListResponse<MediaItem>>(`/tv/${id}/recommendations`);
    return withMediaType(data.results, 'tv');
  },
};
