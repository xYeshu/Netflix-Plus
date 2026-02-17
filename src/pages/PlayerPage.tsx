import { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage } from '../components/common/ErrorMessage';

// Strict sandbox: blocks popups and all navigation (full ad blocking)
const AD_BLOCK_SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-presentation';

export const PlayerPage = () => {
  const navigate = useNavigate();
  const { type, id, season, episode } = useParams();

  // ============================================================
  // DEVICE DETECTION
  // ============================================================

  const isIOS = useMemo(() => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, []);

  const isAndroid = useMemo(() => {
    return /Android/i.test(navigator.userAgent);
  }, []);

  // ============================================================
  // AD BLOCK TOGGLE
  // Set to true to DISABLE sandbox ad blocking for that device.
  // ============================================================
  const skipIOS = true;       // change to: isIOS  (if iOS sandbox breaks)
  const skipAndroid = false;    // change to: isAndroid
  const skipDesktop = false;    // change to: true

  const skipAdBlock =
    (skipIOS && isIOS) ||
    (skipAndroid && isAndroid) ||
    (skipDesktop && !isIOS && !isAndroid);

  // ============================================================

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
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        {...(!skipAdBlock && { sandbox: AD_BLOCK_SANDBOX })}
        {...(!skipAdBlock && { referrerPolicy: 'no-referrer' as const })}
      />
    </div>
  );
};
