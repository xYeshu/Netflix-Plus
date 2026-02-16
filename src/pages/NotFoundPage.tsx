import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
    <div>
      <p className="text-7xl font-black text-netflix-red">404</p>
      <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
      <Link to="/" className="mt-6 inline-block rounded bg-netflix-red px-5 py-2 font-semibold text-white hover:bg-red-700">
        Return Home
      </Link>
    </div>
  </div>
);
