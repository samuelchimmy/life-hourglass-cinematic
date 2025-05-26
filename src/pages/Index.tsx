
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';
import { OrbitalCinematicExperience } from '../components/OrbitalCinematicExperience';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Audio */}
      <audio autoPlay loop className="hidden">
        <source src="https://github.com/samuelchimmy/life-hourglass-cinematic/raw/main/public/public%3Aambient-space.mp3" type="audio/mpeg" />
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
