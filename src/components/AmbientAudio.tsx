import React, { useEffect, useRef, useState } from 'react';

export const AmbientAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    // Set volume programmatically
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (userInteracted && audioRef.current && !isPlaying) {
      console.log('Attempting to play external audio...');
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('External audio started playing successfully');
      }).catch((error) => {
        console.log('Audio autoplay failed:', error);
        setAudioError(error.message);
      });
    }
  }, [userInteracted, isPlaying]);

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const error = (e.target as HTMLAudioElement).error;
    console.error('Audio loading error:', error);
    setAudioError(error?.message || 'Failed to load audio');
  };

  const handleAudioLoad = () => {
    console.log('External audio loaded successfully');
    setAudioError(null);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
        onError={handleAudioError}
        onLoadedData={handleAudioLoad}
        src="https://whyp.it/tracks/283470/publicambient-space?token=nE9yE"
      />
      {audioError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded text-sm z-50">
          Audio Error: {audioError}
        </div>
      )}
    </>
  );
};
