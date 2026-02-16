import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
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
    <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6">
      <h1 className="mb-2 text-2xl font-semibold">Search</h1>
      <p className="mb-6 text-zinc-400">{query ? `Results for "${query}"` : 'Start typing in the search bar.'}</p>

      {isError && <ErrorMessage title="Search failed" message="Unable to fetch search results." />}

      {isLoading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <LoadingSkeleton className="h-[225px] w-full sm:h-[270px]" count={12} />
        </div>
      )}

      {!isLoading && query && !isError && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {allResults.length ? (
              allResults.map((item) => <MovieCard key={`${item.media_type}-${item.id}`} item={item} />)
            ) : (
              <p className="col-span-full text-zinc-400">No results found.</p>
            )}
          </div>

          {hasNextPage && (
            <div ref={ref} className="mt-8 flex justify-center py-4">
              <LoadingSkeleton className="h-[225px] w-full sm:h-[270px]" count={6} />
            </div>
          )}
        </>
      )}
    </div>
  );
};
