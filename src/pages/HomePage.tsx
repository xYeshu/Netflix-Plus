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
    <div className="pb-12 sm:pb-16">
      <div className="pt-3 sm:pt-4">
        <Hero item={trending.data?.[0]} isLoading={trending.isLoading} />
      </div>

      <div className="mt-4 space-y-1 sm:mt-6 sm:space-y-2">
        <MediaRow title="Trending Now" items={trending.data} isLoading={trending.isLoading} />
        <MediaRow title="Popular Movies" items={popularMovies.data} isLoading={popularMovies.isLoading} />
        <MediaRow title="Popular TV Shows" items={popularTV.data} isLoading={popularTV.isLoading} />
        <MediaRow title="Top Rated" items={topRatedMovies.data} isLoading={topRatedMovies.isLoading} />
        <MediaRow title="Action & Adventure" items={actionMovies.data} isLoading={actionMovies.isLoading} />
        <MediaRow title="Comedy" items={comedyMovies.data} isLoading={comedyMovies.isLoading} />
      </div>
    </div>
  );
};
