import { useRef, useState, useEffect } from 'react';
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    checkScroll();
    row.addEventListener('scroll', checkScroll, { passive: true });
    return () => row.removeEventListener('scroll', checkScroll);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.85;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative px-4 py-4 sm:px-6 sm:py-5">
      {/* Section Title */}
      <div className="mb-3 flex items-center gap-3 sm:mb-4">
        <div className="h-5 w-1 rounded-full bg-brand-accent" />
        <h2 className="text-base font-semibold tracking-tight text-brand-text sm:text-lg">{title}</h2>
      </div>

      {/* Scroll Buttons — Desktop */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-r-xl bg-black/60 px-2 py-8 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white md:flex"
          aria-label={`Scroll ${title} left`}
        >
          <FaChevronLeft className="text-sm" />
        </button>
      )}

      {/* Row Items */}
      <div
        ref={rowRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 sm:gap-4"
      >
        {isLoading ? (
          <LoadingSkeleton className="aspect-[2/3] min-w-[130px] sm:min-w-[165px]" count={8} />
        ) : (
          items?.map((item) => <MovieCard key={`${item.media_type}-${item.id}`} item={item} />)
        )}
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-l-xl bg-black/60 px-2 py-8 text-white/80 backdrop-blur-sm transition hover:bg-black/80 hover:text-white md:flex"
          aria-label={`Scroll ${title} right`}
        >
          <FaChevronRight className="text-sm" />
        </button>
      )}

      {/* Edge fade gradients */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute bottom-0 left-0 top-[50px] w-8 bg-gradient-to-r from-brand-bg to-transparent sm:w-12" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute bottom-0 right-0 top-[50px] w-8 bg-gradient-to-l from-brand-bg to-transparent sm:w-12" />
      )}
    </section>
  );
};
