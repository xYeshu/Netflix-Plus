import { FaPlay, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { MediaItem } from '../../types/tmdb';
import { getPosterUrl } from '../../utils/image';
import { getMediaTitle } from '../../utils/helpers';

interface MovieCardProps {
  item: MediaItem;
}

export const MovieCard = ({ item }: MovieCardProps) => {
  const title = getMediaTitle(item.title, item.name);
  const href = item.media_type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`;
  const image = getPosterUrl(item.poster_path);
  const rating = item.vote_average ? (item.vote_average / 2).toFixed(1) : null;

  return (
    <Link
      to={href}
      className="group relative block min-w-[130px] snap-start overflow-hidden rounded-xl bg-brand-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover active:scale-[0.97] sm:min-w-[165px]"
    >
      {/* Poster */}
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex aspect-[2/3] w-full items-center justify-center bg-brand-surface text-center text-[11px] text-brand-muted">
          No poster
        </div>
      )}

      {/* Rating Badge */}
      {rating && (
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
          <FaStar className="text-brand-gold" />
          <span>{rating}</span>
        </div>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-white">{title}</h3>
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-accent">
          <FaPlay className="text-[9px]" />
          Watch Now
        </div>
      </div>

      {/* Media type badge */}
      {item.media_type === 'tv' && (
        <div className="absolute left-2 top-2 rounded bg-brand-accent/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm">
          TV
        </div>
      )}
    </Link>
  );
};
