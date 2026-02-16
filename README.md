# Netflix-Style Streaming Frontend (React + TMDB + Vidking)

Modern streaming frontend built with React, Vite, TypeScript, Tailwind CSS, React Router, and React Query.

## Features

- Netflix-inspired dark UI (`#141414` background, `#e50914` accent)
- Fully frontend-only architecture (no backend, auth, accounts, or database)
- TMDB metadata integration (movies, TV, details, recommendations, episodes)
- Vidking iframe player integration for movies and TV episodes
- Home hero section with weekly trending movie
- Horizontal media carousels with arrow navigation and smooth scroll
- Search page with TMDB multi-search
- Movie and TV detail pages with recommendations
- TV season/episode browser with direct playback links
- Full-screen player route
- Loading skeletons, 404 handling, and app-level error boundary
- Mobile-first responsive layouts

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- React Query (`@tanstack/react-query`)
- Axios

## Project Structure

```text
src/
  api/
    tmdb.ts
  components/
    common/
      ErrorBoundary.tsx
      ErrorMessage.tsx
      LoadingSkeleton.tsx
    layout/
      Header.tsx
      Layout.tsx
    media/
      EpisodeList.tsx
      Hero.tsx
      MediaRow.tsx
      MovieCard.tsx
  hooks/
    queries.ts
    useDebounce.ts
  pages/
    HomePage.tsx
    MovieDetailPage.tsx
    NotFoundPage.tsx
    PlayerPage.tsx
    SearchPage.tsx
    TvDetailPage.tsx
  types/
    tmdb.ts
  utils/
    helpers.ts
    image.ts
  App.tsx
  index.css
  main.tsx
```

## Environment Variables

Copy `.env.example` to `.env` and set your TMDB API key:

```bash
cp .env.example .env
```

`.env`

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## Install & Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Routes

- `/` Home
- `/search?q=your-query` Search
- `/movie/:id` Movie detail
- `/tv/:id` TV detail
- `/player/:type/:id/:season?/:episode?` Fullscreen player
- `/404` Not found

## Playback URLs

- Movie:
  `https://www.vidking.net/embed/movie/{tmdbId}?color=e50914&autoPlay=true`
- TV:
  `https://www.vidking.net/embed/tv/{tmdbId}/{season}/{episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`

## Notes

- TMDB provides metadata only.
- Vidking is used directly in the client iframe player.
