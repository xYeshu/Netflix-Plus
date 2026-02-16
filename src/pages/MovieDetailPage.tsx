import { FaPlay } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { MovieCard } from '../components/media/MovieCard';
import { useMovieDetails, useMovieRecommendations } from '../hooks/queries';
import { getBackdropUrl, getPosterUrl } from '../utils/image';
import { formatRating, getYearFromDate } from '../utils/helpers';

export const MovieDetailPage = () => {
  const { id = '' } = useParams();
  const movieQuery = useMovieDetails(id);
  const recommendationsQuery = useMovieRecommendations(id);

  if (movieQuery.isLoading) {
    return <LoadingSkeleton className="m-6 h-[75vh]" />;
  }

  if (movieQuery.isError || !movieQuery.data) {
    return <ErrorMessage title="Movie not found" message="This movie may not exist or is currently unavailable." />;
  }

  const movie = movieQuery.data;

  return (
    <div>
      <section className="relative min-h-[60vh]">
        {movie.backdrop_path ? (
          <img
            src={getBackdropUrl(movie.backdrop_path, 'original') ?? ''}
            alt={movie.title}
            className="h-[60vh] w-full object-cover"
          />
        ) : (
          <div className="h-[60vh] w-full bg-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-bg via-black/70 to-black/20" />

        <div className="absolute bottom-0 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-6 px-4 pb-8 sm:px-6 md:grid-cols-[280px_1fr]">
          <div className="hidden md:block">
            {movie.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path) ?? ''}
                alt={movie.title}
                className="rounded-lg shadow-glow"
              />
            ) : null}
          </div>

          <div>
            <h1 className="mb-3 text-3xl font-bold sm:text-5xl">{movie.title}</h1>
            <p className="mb-3 text-sm text-zinc-300 sm:text-base">
              {getYearFromDate(movie.release_date)} • {movie.runtime} min • ⭐ {formatRating(movie.vote_average)}
            </p>
            <p className="mb-3 text-sm text-zinc-200">{movie.genres.map((genre) => genre.name).join(' • ')}</p>
            <p className="max-w-3xl text-sm text-zinc-100 sm:text-base">{movie.overview}</p>

            <Link
              to={`/player/movie/${movie.id}`}
              className="mt-6 inline-flex items-center gap-2 rounded bg-netflix-red px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <FaPlay />
              Play Movie
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold">Recommended Movies</h2>

        {recommendationsQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <LoadingSkeleton className="h-[225px] sm:h-[270px]" count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {recommendationsQuery.data?.slice(0, 12).map((item) => <MovieCard key={item.id} item={item} />)}
          </div>
        )}
      </section>
    </div>
  );
};
