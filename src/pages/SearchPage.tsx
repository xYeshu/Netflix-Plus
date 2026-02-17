import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { MovieCard } from '../components/media/MovieCard';
import { useSearchMulti } from '../hooks/queries';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchMulti(query);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allResults = data?.pages.flatMap((page) => page.results) ?? [];

  return (
    <div className="animate-fade-in mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="mb-2 flex items-center gap-3">
          <div className="h-6 w-1 rounded-full bg-brand-accent" />
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Search</h1>
        </div>
        <p className="ml-4 text-sm text-brand-muted">
          {query ? (
            <>Results for <span className="font-medium text-white">"{query}"</span></>
          ) : (
            'Start typing in the search bar to discover movies & shows.'
          )}
        </p>
      </div>

      {isError && <ErrorMessage title="Search failed" message="Unable to fetch search results." />}

      {isLoading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <LoadingSkeleton className="aspect-[2/3] rounded-xl" count={12} />
        </div>
      )}

      {!isLoading && query && !isError && (
        <>
          {allResults.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {allResults.map((item) => <MovieCard key={`${item.media_type}-${item.id}`} item={item} />)}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <FaSearch className="mb-4 text-4xl text-brand-muted/30" />
              <p className="text-lg font-medium text-brand-muted">No results found</p>
              <p className="mt-1 text-sm text-brand-muted/60">Try a different search term</p>
            </div>
          )}

          {hasNextPage && (
            <div ref={ref} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              <LoadingSkeleton className="aspect-[2/3] rounded-xl" count={6} />
            </div>
          )}
        </>
      )}

      {!query && !isLoading && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FaSearch className="mb-4 text-5xl text-brand-muted/20" />
          <p className="text-lg font-medium text-brand-muted">Discover something new</p>
          <p className="mt-1 text-sm text-brand-muted/60">Search for movies, TV shows, and more</p>
        </div>
      )}
    </div>
  );
};
