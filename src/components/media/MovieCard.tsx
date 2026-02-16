import { FaPlay } from 'react-icons/fa';
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

  return (
    <Link to={href} className="group relative block min-w-[150px] snap-start overflow-hidden rounded-md sm:min-w-[180px]">
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-[225px] w-full object-cover transition duration-300 group-hover:scale-110 sm:h-[270px]"
        />
      ) : (
        <div className="flex h-[225px] w-full items-center justify-center bg-zinc-800 text-center text-xs text-zinc-300 sm:h-[270px]">
          No poster available
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm font-semibold text-white">{title}</h3>
        <div className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-netflix-red">
          <FaPlay />
          Play
        </div>
      </div>
    </Link>
  );
};
