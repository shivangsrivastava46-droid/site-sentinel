import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { Music, Volume2 } from 'lucide-react';

export const MusicButton: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.warn('Audio playback could not be started:', error);
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.5;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      // Loop if loop property didn't catch it
      if (audio.loop) {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="fixed top-3.5 right-4 sm:top-3.5 sm:right-6 z-50">
      <audio
        ref={audioRef}
        src="/audio/hedwig-theme.mp3"
        preload="metadata"
        loop
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause Hedwig's Theme" : "Play Hedwig's Theme"}
        title={isPlaying ? "Pause Hedwig's Theme" : "Play Hedwig's Theme"}
        className={`group relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300 outline-none select-none ${
          isPlaying
            ? 'bg-[#12192e]/90 text-amber-300 border border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.45)]'
            : 'bg-[#080d1a]/85 text-amber-200/80 border border-amber-500/35 hover:border-amber-400/80 hover:text-amber-100'
        } hover:shadow-[0_0_18px_rgba(245,197,66,0.6),0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 backdrop-blur-md`}
      >
        {/* Subtle magical outer glow aura on hover */}
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-amber-400/10 via-amber-300/20 to-amber-500/10 blur-[2px]" />

        {isPlaying ? (
          <div className="relative z-10 flex items-center justify-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <div className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] bg-amber-400 rounded-full animate-music-bar-1" />
              <span className="w-[2px] bg-amber-300 rounded-full animate-music-bar-2" />
              <span className="w-[2px] bg-amber-400 rounded-full animate-music-bar-3" />
            </div>
          </div>
        ) : (
          <Music className="relative z-10 w-4 h-4 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
};
