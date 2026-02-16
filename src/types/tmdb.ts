export type MediaType = 'movie' | 'tv';

export interface Genre {
  id: number;
  name: string;
}

export interface MediaItem {
  id: number;
  media_type?: MediaType;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface TMDBListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends MediaItem {
  media_type: 'movie';
  genres: Genre[];
  runtime: number;
  status: string;
}

export interface TVEpisode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
  runtime: number | null;
}

export interface TVSeason {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string | null;
  episode_count: number;
}

export interface TVDetails extends MediaItem {
  media_type: 'tv';
  genres: Genre[];
  number_of_seasons: number;
  seasons: TVSeason[];
  status: string;
}

export interface TVSeasonDetails extends TVSeason {
  episodes: TVEpisode[];
}
