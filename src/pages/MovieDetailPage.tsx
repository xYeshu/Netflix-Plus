import { FaPlay, FaStar } from 'react-icons/fa';
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
    return <LoadingSkeleton className="m-4 h-[75vh] rounded-2xl sm:m-6" />;
  }

  if (movieQuery.isError || !movieQuery.data) {
    return <ErrorMessage title="Movie not found" message="This movie may not exist or is currently unavailable." />;
  }

  const movie = movieQuery.data;

  return (
    <div className="animate-fade-in">
      {/* Hero Backdrop */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh]">
        {movie.backdrop_path ? (
          <img
            src={getBackdropUrl(movie.backdrop_path, 'original') ?? ''}
            alt={movie.title}
            className="h-[55vh] w-full object-cover sm:h-[60vh]"
          />
        ) : (
          <div className="h-[55vh] w-full bg-brand-surface sm:h-[60vh]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-brand-bg/20" />

        <div className="absolute bottom-0 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-5 px-4 pb-6 sm:px-6 sm:pb-8 md:grid-cols-[250px_1fr] md:gap-8">
          {/* Poster */}
          <div className="hidden md:block">
            {movie.poster_path ? (
              <img
                src={getPosterUrl(movie.poster_path) ?? ''}
                alt={movie.title}
                className="rounded-xl shadow-glow ring-1 ring-white/10"
              />
            ) : null}
          </div>

          {/* Info */}
          <div className="animate-fade-up">
            <h1 className="mb-2.5 text-2xl font-black tracking-tight sm:text-4xl md:text-5xl">{movie.title}</h1>

            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-brand-muted">
              <span>{getYearFromDate(movie.release_date)}</span>
              <span className="text-white/20">•</span>
              <span>{movie.runtime} min</span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1 text-brand-gold">
                <FaStar className="text-[10px]" />
                {formatRating(movie.vote_average)}
              </span>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-muted">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">{movie.overview}</p>

            <Link
              to={`/player/movie/${movie.id}`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-accent px-7 py-3 text-sm font-bold text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-glow active:scale-95"
            >
              <FaPlay className="text-xs" />
              Play Movie
            </Link>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-brand-accent" />
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Recommended Movies</h2>
        </div>

        {recommendationsQuery.isLoading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            <LoadingSkeleton className="aspect-[2/3]" count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {recommendationsQuery.data?.slice(0, 12).map((item) => <MovieCard key={item.id} item={item} />)}
          </div>
        )}
      </section>
    </div>
  );
};
