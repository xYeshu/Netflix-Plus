import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="flex min-h-[75vh] items-center justify-center px-4 text-center">
    <div className="animate-fade-up">
      <p className="text-gradient text-8xl font-black sm:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">Page not found</h1>
      <p className="mt-2 text-sm text-brand-muted">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-brand-accent px-8 py-3 text-sm font-bold text-white shadow-glow-sm transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-glow active:scale-95"
      >
        Return Home
      </Link>
    </div>
  </div>
);
