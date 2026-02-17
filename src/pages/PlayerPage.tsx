import { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';

// Strict sandbox for desktop: blocks popups and all navigation (full ad blocking)
const DESKTOP_SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-presentation';

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
    <div className="relative h-screen h-[100dvh] w-screen bg-black">
      <button
        onClick={() => navigate(-1)}
        className="glass absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-white/15 active:scale-95 sm:left-4 sm:top-4 sm:text-sm"
      >
        <FaArrowLeft className="text-[10px]" />
        Back
      </button>

      <iframe
        src={embedUrl}
        title="Netflix+ Player"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        {...(!isMobile && { sandbox: DESKTOP_SANDBOX })}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
