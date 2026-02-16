export const getMediaTitle = (title?: string, name?: string) => title || name || 'Untitled';

export const getYearFromDate = (date?: string) => {
  if (!date) return 'N/A';
  return new Date(date).getFullYear().toString();
};

export const formatRating = (voteAverage: number) => voteAverage.toFixed(1);
