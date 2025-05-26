
import React, { useRef, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';
import { OrbitalCinematicExperience } from '../components/OrbitalCinematicExperience';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error('Audio failed to load:', e);
    setShowPlayButton(true);
  };

  const handleAudioCanPlay = () => {
    console.log('Audio can play');
    tryPlayAudio();
  };

  const tryPlayAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setAudioPlaying(true);
        setShowPlayButton(false);
        console.log('Audio playing successfully');
      } catch (error) {
        console.log('Autoplay blocked by browser, showing play button');
        setShowPlayButton(true);
      }
    }
  };

  const handleUserPlayAudio = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setAudioPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Failed to play audio:', error);
      }
    }
  };

  useEffect(() => {
    // Try to play audio after component mounts
    const timer = setTimeout(() => {
      tryPlayAudio();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Audio */}
      <audio 
        ref={audioRef}
        autoPlay
        loop 
        className="hidden"
        onError={handleAudioError}
        onCanPlay={handleAudioCanPlay}
        preload="auto"
      >
        <source src="https://djqkwgivgfudjcqhpxap.supabase.co/storage/v1/object/public/deathmp3/ambient-space.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio Play Button (shown when autoplay is blocked) */}
      {showPlayButton && !audioPlaying && (
        <button
          onClick={handleUserPlayAudio}
          className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          🔊 Play Audio
        </button>
      )}

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
