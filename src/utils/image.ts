const IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const getPosterUrl = (path: string | null, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size = 'w1280') => {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
};
