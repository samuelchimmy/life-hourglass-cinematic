
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';
import { OrbitalCinematicExperience } from '../components/OrbitalCinematicExperience';
import { AmbientAudio } from '../components/AmbientAudio';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Ambient Audio */}
      <AmbientAudio />
      
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
