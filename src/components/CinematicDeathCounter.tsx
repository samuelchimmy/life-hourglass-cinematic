
import React, { useEffect, useState } from 'react';

interface CinematicDeathCounterProps {
  cause: string;
  dailyDeaths: number;
  icon: string;
  color: string;
  description: string;
  deathsPerSecond: number;
  globalTime: number;
  index: number;
  isActive: boolean;
  delay: number;
}

export const CinematicDeathCounter: React.FC<CinematicDeathCounterProps> = ({
  cause,
  dailyDeaths,
  icon,
  color,
  description,
  deathsPerSecond,
  globalTime,
  index,
  isActive,
  delay
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (hasEntered) {
      const newCount = Math.floor(globalTime * deathsPerSecond);
      setCurrentCount(newCount);
    }
  }, [globalTime, deathsPerSecond, hasEntered]);

  if (!hasEntered) return null;

  return (
    <div 
      className={`
        relative mb-12 transition-all duration-1000 transform
        ${isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-70'}
        ${hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
      style={{ 
        animationDelay: `${index * 0.5}s`,
        transform: isActive ? 'translateX(0)' : `translateX(${index % 2 === 0 ? '-20px' : '20px'})`,
      }}
    >
      {/* Cinematic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10 rounded-3xl blur-xl scale-110`}></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-3xl p-8 border border-gray-700/30">
        
        {/* Floating Particles */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  backgroundColor: color.includes('red') ? '#ef4444' : '#06b6d4',
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 2) * 40}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
        )}

        {/* Content Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Icon and Cause */}
          <div className="text-center lg:text-left">
            <div className={`text-6xl mb-4 ${isActive ? 'animate-pulse' : ''}`}>
              {icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{cause}</h2>
            <p className="text-gray-400 italic text-sm">{description}</p>
          </div>

          {/* Death Counter */}
          <div className="text-center">
            <div className={`text-5xl font-mono font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
              {currentCount.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">deaths so far</div>
            <div className="text-gray-500 text-xs mt-1">
              ~{deathsPerSecond.toFixed(3)} per second
            </div>
          </div>

          {/* Visual Indicator */}
          <div className="flex flex-col items-center lg:items-end">
            <div className="w-24 h-24 relative">
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20`}></div>
              <div 
                className={`absolute inset-2 rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
                style={{ 
                  transform: `scale(${Math.min(1, currentCount / (dailyDeaths * 0.1))})`,
                  opacity: isActive ? 0.8 : 0.4
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              {dailyDeaths.toLocaleString()} daily
            </div>
          </div>
        </div>

        {/* Progress Wave */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 rounded-b-3xl overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${color} transition-all duration-1000`}
              style={{ 
                width: `${Math.min(100, (currentCount / (dailyDeaths * 0.1)) * 100)}%`,
              }}
            >
              <div className="h-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
