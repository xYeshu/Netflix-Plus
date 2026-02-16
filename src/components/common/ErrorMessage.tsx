interface ErrorMessageProps {
  title?: string;
  message?: string;
}

export const ErrorMessage = ({
  title = 'Something went wrong',
  message = 'Please try again in a moment.',
}: ErrorMessageProps) => (
  <div className="mx-auto my-8 max-w-2xl rounded-lg border border-zinc-700 bg-zinc-900/80 p-6 text-center">
    <h2 className="mb-2 text-2xl font-semibold text-white">{title}</h2>
    <p className="text-zinc-300">{message}</p>
  </div>
);
