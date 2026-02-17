import { FormEvent, useEffect, useRef, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [searchOpen, setSearchOpen] = useState(false);

  const initialQuery = location.pathname === '/search' ? searchParams.get('q') ?? '' : '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 500);
  const isInitialRender = useRef(true);
  const isUserTyping = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync external URL changes back to query state
  useEffect(() => {
    if (location.pathname === '/search') {
      const urlQuery = searchParams.get('q') ?? '';
      if (urlQuery !== query) {
        setQuery(urlQuery);
      }
    } else {
      if (query !== '') {
        setQuery('');
      }
      setSearchOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, searchParams]);

  // Navigate when debounced query changes
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!isUserTyping.current) {
      return;
    }

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

  // Focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

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

  const clearSearch = () => {
    setQuery('');
    setSearchOpen(false);
  };

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">

        {/* Logo */}
        <Link to="/" className="group flex shrink-0 items-baseline gap-1.5 transition-transform active:scale-95">
          <span className="text-gradient text-xl font-black tracking-tight sm:text-2xl">
            Netflix+
          </span>
          <span className="text-[10px] font-medium tracking-widest text-brand-muted uppercase">
            by Yeshu
          </span>
        </Link>

        {/* Search — Desktop */}
        <form
          onSubmit={onSubmit}
          className="hidden items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-2.5 transition-all duration-300 focus-within:border-brand-accent/40 focus-within:bg-white/[0.06] sm:flex sm:w-full sm:max-w-md lg:max-w-lg"
        >
          <FaSearch className="shrink-0 text-xs text-brand-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            type="text"
            placeholder="Search movies and TV shows..."
            className="w-full bg-transparent text-sm font-light text-brand-text outline-none placeholder:text-brand-muted/60"
          />
          {query && (
            <button type="button" onClick={clearSearch} className="shrink-0 text-brand-muted transition hover:text-white">
              <FaTimes className="text-xs" />
            </button>
          )}
        </form>

        {/* Search — Mobile Toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="rounded-lg border border-white/[0.06] bg-white/[0.04] p-2.5 text-brand-muted transition hover:text-white active:scale-95 sm:hidden"
          aria-label="Toggle search"
        >
          <FaSearch className="text-sm" />
        </button>
      </div>

      {/* Mobile Search Expanded */}
      {searchOpen && (
        <div className="animate-fade-in border-t border-white/[0.04] px-4 pb-3 sm:hidden">
          <form onSubmit={onSubmit} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
            <FaSearch className="shrink-0 text-xs text-brand-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={handleInputChange}
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-sm font-light text-brand-text outline-none placeholder:text-brand-muted/60"
            />
            {query && (
              <button type="button" onClick={clearSearch} className="text-brand-muted transition hover:text-white">
                <FaTimes className="text-xs" />
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
};
