import { useEffect, useState } from 'react';
import { FaPlay, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { EpisodeList } from '../components/media/EpisodeList';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { MovieCard } from '../components/media/MovieCard';
import { useTvDetails, useTvRecommendations, useTvSeasonDetails } from '../hooks/queries';
import { getBackdropUrl, getPosterUrl } from '../utils/image';
import { formatRating, getYearFromDate } from '../utils/helpers';

export const TvDetailPage = () => {
  const { id = '' } = useParams();
  const tvQuery = useTvDetails(id);
  const recommendationsQuery = useTvRecommendations(id);
  const [selectedSeason, setSelectedSeason] = useState(1);

  const seasonQuery = useTvSeasonDetails(id, selectedSeason, !!tvQuery.data);

  useEffect(() => {
    if (!tvQuery.data) return;
    const validSeasons = tvQuery.data.seasons.filter((season) => season.season_number > 0);
    if (!validSeasons.some((season) => season.season_number === selectedSeason)) {
      setSelectedSeason(validSeasons[0]?.season_number ?? 1);
    }
  }, [selectedSeason, tvQuery.data]);

  if (tvQuery.isLoading) {
    return <LoadingSkeleton className="m-4 h-[75vh] rounded-2xl sm:m-6" />;
  }

  if (tvQuery.isError || !tvQuery.data) {
    return <ErrorMessage title="TV show not found" message="This TV show may not exist or is currently unavailable." />;
  }

  const show = tvQuery.data;

  return (
    <div className="animate-fade-in">
      {/* Hero Backdrop */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh]">
        {show.backdrop_path ? (
          <img
            src={getBackdropUrl(show.backdrop_path, 'original') ?? ''}
            alt={show.name}
            className="h-[55vh] w-full object-cover sm:h-[60vh]"
          />
        ) : (
          <div className="h-[55vh] w-full bg-brand-surface sm:h-[60vh]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-brand-bg/20" />

        <div className="absolute bottom-0 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-5 px-4 pb-6 sm:px-6 sm:pb-8 md:grid-cols-[250px_1fr] md:gap-8">
          <div className="hidden md:block">
            {show.poster_path ? (
              <img src={getPosterUrl(show.poster_path) ?? ''} alt={show.name} className="rounded-xl shadow-glow ring-1 ring-white/10" />
            ) : null}
          </div>

          <div className="animate-fade-up">
            <h1 className="mb-2.5 text-2xl font-black tracking-tight sm:text-4xl md:text-5xl">{show.name}</h1>

            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-brand-muted">
              <span>{getYearFromDate(show.first_air_date)}</span>
              <span className="text-white/20">•</span>
              <span>{show.number_of_seasons} season{show.number_of_seasons !== 1 ? 's' : ''}</span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1 text-brand-gold">
                <FaStar className="text-[10px]" />
                {formatRating(show.vote_average)}
              </span>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              {show.genres.map((genre) => (
                <span key={genre.id} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-muted">
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="mb-5 max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">{show.overview}</p>

            <Link
              to={`/player/tv/${show.id}/1/1`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand-accent px-7 py-3 text-sm font-bold text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-glow active:scale-95"
            >
              <FaPlay className="text-xs" />
              Play Episode 1
            </Link>
          </div>
        </div>
      </section>

      {/* Seasons & Episodes */}
      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-brand-accent" />
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Seasons & Episodes</h2>
        </div>

        <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto pb-1">
          {show.seasons
            .filter((season) => season.season_number > 0)
            .map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.season_number)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${selectedSeason === season.season_number
                    ? 'bg-brand-accent text-white shadow-glow-sm'
                    : 'border border-white/8 bg-white/5 text-brand-muted hover:bg-white/10 hover:text-white'
                  }`}
              >
                Season {season.season_number}
              </button>
            ))}
        </div>

        {seasonQuery.isLoading ? (
          <LoadingSkeleton className="h-24 rounded-xl" count={5} />
        ) : (
          <EpisodeList tmdbId={id} seasonData={seasonQuery.data} />
        )}
      </section>

      {/* Recommendations */}
      <section className="mx-auto w-full max-w-[1600px] px-4 pb-12 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-brand-accent" />
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Recommended Shows</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
          {recommendationsQuery.data?.slice(0, 12).map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      </section>
    </div>
  );
};
