import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { MediaItem } from '../../types/tmdb';
import { getBackdropUrl } from '../../utils/image';
import { getMediaTitle } from '../../utils/helpers';
import { LoadingSkeleton } from '../common/LoadingSkeleton';

interface HeroProps {
  item?: MediaItem;
  isLoading: boolean;
}

export const Hero = ({ item, isLoading }: HeroProps) => {
  if (isLoading) {
    return (
      <div className="px-4 py-4 sm:px-6">
        <LoadingSkeleton className="h-[60vh] w-full rounded-xl" />
      </div>
    );
  }

  if (!item) return null;

  const title = getMediaTitle(item.title, item.name);
  const image = getBackdropUrl(item.backdrop_path, 'original');

  return (
    <section className="relative m-4 overflow-hidden rounded-xl sm:m-6">
      {image ? (
        <img src={image} alt={title} className="h-[55vh] w-full object-cover" />
      ) : (
        <div className="h-[55vh] w-full bg-zinc-800" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-bg via-transparent to-transparent" />

      <div className="absolute bottom-0 max-w-2xl p-6 sm:p-8">
        <h1 className="mb-4 text-3xl font-bold sm:text-5xl">{title}</h1>
        <p className="mb-6 line-clamp-3 text-sm text-zinc-100 sm:text-base">{item.overview}</p>
        <Link
          to={`/player/${item.media_type || 'movie'}/${item.id}`}
          className="inline-flex items-center gap-2 rounded bg-netflix-red px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <FaPlay />
          Play
        </Link>
      </div>
    </section>
  );
};
