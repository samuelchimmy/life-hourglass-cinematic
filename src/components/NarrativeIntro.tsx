
import React, { useState, useEffect } from 'react';

export const NarrativeIntro: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const narrativeTexts = [
    "In the next 60 seconds...",
    "Around the world...",
    "Lives will end.",
    "This is their story."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % narrativeTexts.length);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-8 animate-fade-in">
      {/* Main Title */}
      <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
        Every Second
      </div>
      
      {/* Narrative Text */}
      <div className="h-16 flex items-center justify-center">
        <div 
          key={currentText}
          className="text-3xl text-gray-300 animate-fade-in font-light"
        >
          {narrativeTexts[currentText]}
        </div>
      </div>

      {/* Subtitle */}
      <div className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
        A cinematic journey through global mortality
      </div>

      {/* Atmospheric Elements */}
      <div className="relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-32 h-32 border border-cyan-400/30 rounded-full animate-ping"></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-24 h-24 border border-purple-400/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-16 h-16 border border-blue-400/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>
    </div>
  );
};
