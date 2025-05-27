
import React, { useRef, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';
import { OrbitalCinematicExperience } from '../components/OrbitalCinematicExperience';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio failed to load:', e);
  };

  const handleAudioCanPlay = () => {
    console.log('Audio can play');
    tryPlayAudio();
  };

  const tryPlayAudio = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        setAudioPlaying(true);
        console.log('Audio playing successfully');
      } catch (error) {
        console.log('Initial autoplay attempt failed, trying again...');
        // Try again after a short delay
        setTimeout(async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              setAudioPlaying(true);
            }
          } catch (retryError) {
            console.log('Audio autoplay blocked by browser');
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    // Multiple attempts to autoplay
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.5;
        
        // Immediate attempt
        try {
          await audioRef.current.play();
          setAudioPlaying(true);
          return;
        } catch (error) {
          console.log('Immediate autoplay failed, trying additional methods...');
        }

        // Try with user interaction simulation
        setTimeout(async () => {
          try {
            if (audioRef.current) {
              await audioRef.current.play();
              setAudioPlaying(true);
            }
          } catch (error) {
            console.log('Delayed autoplay failed');
          }
        }, 500);
      }
    };

    // Start autoplay attempts immediately
    attemptAutoplay();

    // Also try when audio is loaded
    const timer = setTimeout(() => {
      tryPlayAudio();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Audio - enhanced autoplay */}
      <audio 
        ref={audioRef}
        autoPlay
        loop 
        muted={false}
        className="hidden"
        onError={handleAudioError}
        onCanPlay={handleAudioCanPlay}
        onLoadedData={tryPlayAudio}
        preload="auto"
        crossOrigin="anonymous"
      >
        <source src="https://djqkwgivgfudjcqhpxap.supabase.co/storage/v1/object/public/deathmp3/ambient-space.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Particle Background */}
      <ParticleEffect />
      
      <div className="relative z-10">
        <Header />
        
        {/* Orbital Cinematic Experience */}
        <OrbitalCinematicExperience />

        <Footer />
      </div>
    </div>
  );
};

export default Index;
