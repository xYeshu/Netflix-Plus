import { FaPlay } from 'react-icons/fa';
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
    <div className="space-y-2.5 sm:space-y-3">
      {seasonData.episodes.map((episode) => (
        <Link
          key={episode.id}
          to={`/player/tv/${tmdbId}/${seasonData.season_number}/${episode.episode_number}`}
          className="group grid gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05] active:scale-[0.99] sm:grid-cols-[200px_1fr] sm:p-4"
        >
          {/* Thumbnail */}
          <div className="relative overflow-hidden rounded-lg">
            {episode.still_path ? (
              <img
                src={getBackdropUrl(episode.still_path, 'w300') ?? ''}
                alt={episode.name}
                loading="lazy"
                className="h-24 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-28"
              />
            ) : (
              <div className="flex h-24 items-center justify-center rounded-lg bg-brand-surface text-xs text-brand-muted sm:h-28">
                No preview
              </div>
            )}
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="rounded-full bg-brand-accent p-2.5 shadow-glow-sm">
                <FaPlay className="text-xs text-white" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-sm font-semibold text-white sm:text-base">
              <span className="text-brand-muted">E{episode.episode_number}</span> · {episode.name}
            </h3>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-brand-muted sm:text-sm">
              {episode.overview || 'No overview available.'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};
