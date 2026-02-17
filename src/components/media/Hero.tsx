import { FaPlay, FaInfoCircle } from 'react-icons/fa';
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
      <div className="px-4 py-3 sm:px-6">
        <LoadingSkeleton className="aspect-[16/9] w-full rounded-2xl sm:aspect-[21/9]" />
      </div>
    );
  }

  if (!item) return null;

  const title = getMediaTitle(item.title, item.name);
  const image = getBackdropUrl(item.backdrop_path, 'original');
  const detailHref = `/${item.media_type || 'movie'}/${item.id}`;

  return (
    <section className="relative mx-3 overflow-hidden rounded-2xl sm:mx-5 md:mx-6">
      {/* Background Image */}
      {image ? (
        <img
          src={image}
          alt={title}
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
      ) : (
        <div className="aspect-[16/9] w-full bg-brand-surface sm:aspect-[21/9]" />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="animate-fade-up max-w-lg p-5 pb-6 sm:max-w-xl sm:p-8 md:max-w-2xl md:p-10">
          <h1 className="mb-2 text-2xl font-black leading-tight tracking-tight sm:mb-3 sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/70 sm:mb-5 sm:line-clamp-3 sm:text-sm md:text-base">
            {item.overview}
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <Link
              to={`/player/${item.media_type || 'movie'}/${item.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-5 py-2.5 text-xs font-bold text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-glow active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              <FaPlay className="text-[10px] sm:text-xs" />
              Play Now
            </Link>
            <Link
              to={detailHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
            >
              <FaInfoCircle className="text-[10px] sm:text-xs" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
