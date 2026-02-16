import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import type { MediaItem } from '../../types/tmdb';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { MovieCard } from './MovieCard';

interface MediaRowProps {
  title: string;
  items?: MediaItem[];
  isLoading: boolean;
}

export const MediaRow = ({ title, items, isLoading }: MediaRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.9;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative px-4 py-5 sm:px-6">
      <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>

      <button
        onClick={() => scroll('left')}
        className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black md:block"
        aria-label={`Scroll ${title} left`}
      >
        <FaChevronLeft />
      </button>

      <div
        ref={rowRef}
        className="no-scrollbar flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2"
      >
        {isLoading ? (
          <LoadingSkeleton className="h-[225px] min-w-[150px] sm:h-[270px] sm:min-w-[180px]" count={8} />
        ) : (
          items?.map((item) => <MovieCard key={`${item.media_type}-${item.id}`} item={item} />)
        )}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/70 p-3 text-white transition hover:bg-black md:block"
        aria-label={`Scroll ${title} right`}
      >
        <FaChevronRight />
      </button>
    </section>
  );
};
