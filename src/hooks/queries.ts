import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../api/tmdb';

export const queryKeys = {
  trendingMovies: ['trendingMovies'] as const,
  popularMovies: ['popularMovies'] as const,
  popularTV: ['popularTV'] as const,
  topRatedMovies: ['topRatedMovies'] as const,
  moviesByGenre: (genreId: number) => ['moviesByGenre', genreId] as const,
  searchMulti: (query: string) => ['searchMulti', query] as const,
  movieDetails: (id: string) => ['movieDetails', id] as const,
  movieRecommendations: (id: string) => ['movieRecommendations', id] as const,
  tvDetails: (id: string) => ['tvDetails', id] as const,
  tvSeasonDetails: (id: string, season: number) => ['tvSeasonDetails', id, season] as const,
  tvRecommendations: (id: string) => ['tvRecommendations', id] as const,
};

export const useTrendingMovies = () =>
  useQuery({ queryKey: queryKeys.trendingMovies, queryFn: tmdbApi.trendingMovies });

export const usePopularMovies = () =>
  useQuery({ queryKey: queryKeys.popularMovies, queryFn: tmdbApi.popularMovies });

export const usePopularTV = () => useQuery({ queryKey: queryKeys.popularTV, queryFn: tmdbApi.popularTV });

export const useTopRatedMovies = () =>
  useQuery({ queryKey: queryKeys.topRatedMovies, queryFn: tmdbApi.topRatedMovies });

export const useMoviesByGenre = (genreId: number) =>
  useQuery({ queryKey: queryKeys.moviesByGenre(genreId), queryFn: () => tmdbApi.moviesByGenre(genreId) });

export const useSearchMulti = (query: string) =>
  useInfiniteQuery({
    queryKey: queryKeys.searchMulti(query),
    queryFn: ({ pageParam = 1 }) => tmdbApi.searchMulti(query, pageParam),
    getNextPageParam: (lastPage) => (lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined),
    initialPageParam: 1,
    enabled: query.trim().length > 0,
  });

export const useMovieDetails = (id: string) =>
  useQuery({ queryKey: queryKeys.movieDetails(id), queryFn: () => tmdbApi.movieDetails(id) });

export const useMovieRecommendations = (id: string) =>
  useQuery({
    queryKey: queryKeys.movieRecommendations(id),
    queryFn: () => tmdbApi.movieRecommendations(id),
  });

export const useTvDetails = (id: string) =>
  useQuery({ queryKey: queryKeys.tvDetails(id), queryFn: () => tmdbApi.tvDetails(id) });

export const useTvSeasonDetails = (id: string, season: number, enabled: boolean) =>
  useQuery({
    queryKey: queryKeys.tvSeasonDetails(id, season),
    queryFn: () => tmdbApi.tvSeasonDetails(id, season),
    enabled,
  });

export const useTvRecommendations = (id: string) =>
  useQuery({ queryKey: queryKeys.tvRecommendations(id), queryFn: () => tmdbApi.tvRecommendations(id) });
