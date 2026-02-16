import { FormEvent, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialQuery = location.pathname === '/search' ? searchParams.get('q') ?? '' : '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    if (!debouncedQuery) return;

    const currentQuery = searchParams.get('q') ?? '';
    if (debouncedQuery === currentQuery) return;

    navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`, {
      replace: location.pathname === '/search'
    });
  }, [debouncedQuery, location.pathname, navigate, searchParams]);

  useEffect(() => {
    if (location.pathname !== '/search' && query) {
      setQuery('');
    }
  }, [location.pathname, query]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-netflix-bg/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="text-2xl font-extrabold uppercase tracking-wider text-netflix-red">
          VIDKING
        </Link>

        <form onSubmit={onSubmit} className="flex w-full max-w-lg items-center gap-2 rounded bg-zinc-900 px-3 py-2">
          <FaSearch className="text-zinc-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search movies and TV shows..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </form>
      </div>
    </header>
  );
};
