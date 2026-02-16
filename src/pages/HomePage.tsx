import { Hero } from '../components/media/Hero';
import { MediaRow } from '../components/media/MediaRow';
import {
  useMoviesByGenre,
  usePopularMovies,
  usePopularTV,
  useTopRatedMovies,
  useTrendingMovies,
} from '../hooks/queries';

export const HomePage = () => {
  const trending = useTrendingMovies();
  const popularMovies = usePopularMovies();
  const popularTV = usePopularTV();
  const topRatedMovies = useTopRatedMovies();
  const actionMovies = useMoviesByGenre(28);
  const comedyMovies = useMoviesByGenre(35);

  return (
    <div className="pb-10">
      <Hero item={trending.data?.[0]} isLoading={trending.isLoading} />
      <MediaRow title="Trending Movies" items={trending.data} isLoading={trending.isLoading} />
      <MediaRow title="Popular Movies" items={popularMovies.data} isLoading={popularMovies.isLoading} />
      <MediaRow title="Popular TV Shows" items={popularTV.data} isLoading={popularTV.isLoading} />
      <MediaRow title="Top Rated Movies" items={topRatedMovies.data} isLoading={topRatedMovies.isLoading} />
      <MediaRow title="Action Movies" items={actionMovies.data} isLoading={actionMovies.isLoading} />
      <MediaRow title="Comedy Movies" items={comedyMovies.data} isLoading={comedyMovies.isLoading} />
    </div>
  );
};
