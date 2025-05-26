
import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ParticleEffect } from '../components/ParticleEffect';
import { CinematicController } from '../components/CinematicController';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle Background */}
      <ParticleEffect />
      
      <div className="relative z-10">
        <Header />
        
        {/* Cinematic Experience */}
        <CinematicController />

        <Footer />
      </div>
    </div>
  );
};

export default Index;
