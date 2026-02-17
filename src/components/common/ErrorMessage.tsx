import { Link } from 'react-router-dom';

interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
}: ErrorMessageProps) => (
  <div className="mx-auto my-8 max-w-2xl rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-center backdrop-blur-sm">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/10">
      <span className="text-2xl">⚠️</span>
    </div>
    <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>
    <p className="mb-6 text-sm text-brand-muted">{message}</p>
    <Link
      to="/"
      className="inline-block rounded-lg bg-white/10 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
    >
      Go Home
    </Link>
  </div>
);
