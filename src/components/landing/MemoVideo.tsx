import { useRef, useEffect } from "react";

interface MemoVideoProps {
  visible: boolean;
  toggleVisibility: () => void;
}

const MemoVideo: React.FC<MemoVideoProps> = ({ visible, toggleVisibility }) => {
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    if (visible) {
      // When the modal becomes visible, insert the video source
      playerRef.current.src = "https://www.youtube.com/embed/pLlJYq_jgbE";
    } else {
      // When the modal is hidden, remove the video source
      playerRef.current.src = "";
    }
  }, [visible]);

  return (
    <div className={`promo__video-overlay ${visible ? "visible" : "hidden"}`}>
      <div className="promo__video-container">
        <button className="promo__video-close-btn" onClick={toggleVisibility}>
          X
        </button>
        <iframe
          ref={playerRef}
          className="promo__video-iframe"
          title="SFC TNC Video Memo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MemoVideo;
