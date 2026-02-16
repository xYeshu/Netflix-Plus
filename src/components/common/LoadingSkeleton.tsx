interface LoadingSkeletonProps {
  className?: string;
  count?: number;
}

export const LoadingSkeleton = ({ className = '', count = 1 }: LoadingSkeletonProps) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={`skeleton-${index}`}
        className={`animate-pulse rounded-md bg-zinc-800/90 ${className}`}
      />
    ))}
  </>
);
