import { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';

// Strict sandbox for desktop: blocks popups and all navigation (full ad blocking)
const DESKTOP_SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-presentation';
// Relaxed sandbox for mobile: allows popups needed for video playback, still blocks top navigation
const MOBILE_SANDBOX =
  'allow-scripts allow-same-origin allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox allow-modals allow-top-navigation'; //allow-top-navigation

export const PlayerPage = () => {
  const navigate = useNavigate();
  const { type, id, season, episode } = useParams();

  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  const embedUrl =
    type === 'movie'
      ? `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`
      : type === 'tv' && season && episode
        ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
        : null;

  if (!embedUrl) {
    return <ErrorMessage title="Invalid player URL" message="Missing or invalid player parameters." />;
  }

  return (
    <div className="relative h-screen w-screen bg-black">
      <button
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded bg-black/70 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-black"
      >
        <FaArrowLeft />
        Back
      </button>

      <iframe
        src={embedUrl}
        title="Vidking Player"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        sandbox={isMobile ? MOBILE_SANDBOX : DESKTOP_SANDBOX}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
