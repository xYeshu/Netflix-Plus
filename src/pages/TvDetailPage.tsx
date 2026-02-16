import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
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

  if (tvQuery.isLoading) {
    return <LoadingSkeleton className="m-6 h-[75vh]" />;
  }

  if (tvQuery.isError || !tvQuery.data) {
    return <ErrorMessage title="TV show not found" message="This TV show may not exist or is currently unavailable." />;
  }

  const show = tvQuery.data;

  useEffect(() => {
    const validSeasons = show.seasons.filter((season) => season.season_number > 0);
    if (!validSeasons.some((season) => season.season_number === selectedSeason)) {
      setSelectedSeason(validSeasons[0]?.season_number ?? 1);
    }
  }, [selectedSeason, show.seasons]);

  return (
    <div>
      <section className="relative min-h-[60vh]">
        {show.backdrop_path ? (
          <img
            src={getBackdropUrl(show.backdrop_path, 'original') ?? ''}
            alt={show.name}
            className="h-[60vh] w-full object-cover"
          />
        ) : (
          <div className="h-[60vh] w-full bg-zinc-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-bg via-black/70 to-black/20" />

        <div className="absolute bottom-0 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-end gap-6 px-4 pb-8 sm:px-6 md:grid-cols-[280px_1fr]">
          <div className="hidden md:block">
            {show.poster_path ? (
              <img src={getPosterUrl(show.poster_path) ?? ''} alt={show.name} className="rounded-lg shadow-glow" />
            ) : null}
          </div>

          <div>
            <h1 className="mb-3 text-3xl font-bold sm:text-5xl">{show.name}</h1>
            <p className="mb-3 text-sm text-zinc-300 sm:text-base">
              {getYearFromDate(show.first_air_date)} • {show.number_of_seasons} seasons • ⭐{' '}
              {formatRating(show.vote_average)}
            </p>
            <p className="mb-3 text-sm text-zinc-200">{show.genres.map((genre) => genre.name).join(' • ')}</p>
            <p className="max-w-3xl text-sm text-zinc-100 sm:text-base">{show.overview}</p>

            <Link
              to={`/player/tv/${show.id}/1/1`}
              className="mt-6 inline-flex items-center gap-2 rounded bg-netflix-red px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <FaPlay />
              Play Episode 1
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold">Seasons & Episodes</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          {show.seasons
            .filter((season) => season.season_number > 0)
            .map((season) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.season_number)}
                className={`rounded px-4 py-2 text-sm font-semibold transition ${
                  selectedSeason === season.season_number
                    ? 'bg-netflix-red text-white'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                Season {season.season_number}
              </button>
            ))}
        </div>

        {seasonQuery.isLoading ? (
          <LoadingSkeleton className="h-24" count={5} />
        ) : (
          <EpisodeList tmdbId={id} seasonData={seasonQuery.data} />
        )}
      </section>

      <section className="mx-auto w-full max-w-[1600px] px-4 pb-12 sm:px-6">
        <h2 className="mb-4 text-2xl font-semibold">Recommended Shows</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {recommendationsQuery.data?.slice(0, 12).map((item) => <MovieCard key={item.id} item={item} />)}
        </div>
      </section>
    </div>
  );
};
