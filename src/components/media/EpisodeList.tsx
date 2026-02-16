import { Link } from 'react-router-dom';
import type { TVSeasonDetails } from '../../types/tmdb';
import { getBackdropUrl } from '../../utils/image';

interface EpisodeListProps {
  tmdbId: string;
  seasonData?: TVSeasonDetails;
}

export const EpisodeList = ({ tmdbId, seasonData }: EpisodeListProps) => {
  if (!seasonData) return null;

  return (
    <div className="space-y-3">
      {seasonData.episodes.map((episode) => (
        <Link
          key={episode.id}
          to={`/player/tv/${tmdbId}/${seasonData.season_number}/${episode.episode_number}`}
          className="grid gap-3 rounded-lg border border-zinc-800 bg-zinc-900/60 p-3 transition hover:border-zinc-700 sm:grid-cols-[180px_1fr]"
        >
          {episode.still_path ? (
            <img
              src={getBackdropUrl(episode.still_path, 'w300') ?? ''}
              alt={episode.name}
              loading="lazy"
              className="h-24 w-full rounded object-cover"
            />
          ) : (
            <div className="flex h-24 items-center justify-center rounded bg-zinc-800 text-xs text-zinc-300">
              No still image
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-white">
              E{episode.episode_number}: {episode.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs text-zinc-300">{episode.overview || 'No overview available.'}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
