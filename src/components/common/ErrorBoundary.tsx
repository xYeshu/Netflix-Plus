import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('Unhandled app error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-netflix-bg px-4 text-center text-white">
          <div>
            <h1 className="mb-3 text-3xl font-bold">Application Error</h1>
            <p className="mb-5 text-zinc-300">An unexpected error occurred.</p>
            <Link to="/" className="rounded bg-netflix-red px-4 py-2 font-semibold text-white hover:bg-red-700">
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
