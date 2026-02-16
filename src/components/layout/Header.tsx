import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Set initial query from URL if we are on the search page
  const initialQuery = location.pathname === '/search' ? searchParams.get('q') ?? '' : '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const isInitialRender = useRef(true);
  // Track whether the user is actively typing in the search bar.
  // This prevents the debounced navigation from firing when the query
  // is cleared programmatically (e.g., when navigating away from /search).
  const isUserTyping = useRef(false);

  // Sync external URL changes (e.g. back button) back to query state
  useEffect(() => {
    if (location.pathname === '/search') {
      const urlQuery = searchParams.get('q') ?? '';
      if (urlQuery !== query) {
        setQuery(urlQuery);
      }
    } else {
      // Clear query when not on search page (programmatic, not user-initiated)
      if (query !== '') {
        setQuery('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, searchParams]);

  // Navigate when debounced query changes — but ONLY if the user is actively typing
  useEffect(() => {
    // Skip the very first render to avoid redundant navigation
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only navigate if the user initiated the query change via the input field.
    // This prevents redirecting back to /search when the query is cleared
    // programmatically after the user clicks a movie card link.
    if (!isUserTyping.current) {
      return;
    }

    // Reset the typing flag — the navigation is about to happen
    isUserTyping.current = false;

    if (debouncedQuery.trim()) {
      const currentUrlQuery = searchParams.get('q') ?? '';
      if (debouncedQuery !== currentUrlQuery || location.pathname !== '/search') {
        navigate(`/search?q=${encodeURIComponent(debouncedQuery)}`, {
          replace: location.pathname === '/search'
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery, navigate]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isUserTyping.current = true;
    setQuery(event.target.value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-netflix-bg/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link to="/" className="text-2xl font-extrabold uppercase tracking-wider text-netflix-red">
          NETFLIX plus
        </Link>

        <form onSubmit={onSubmit} className="flex w-full max-w-lg items-center gap-2 rounded bg-zinc-900 px-3 py-2">
          <FaSearch className="text-zinc-400" />
          <input
            value={query}
            onChange={handleInputChange}
            type="text"
            placeholder="Search movies and TV shows..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </form>
      </div>
    </header>
  );
};

