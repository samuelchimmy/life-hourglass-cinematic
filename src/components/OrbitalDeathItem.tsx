
import React, { useState, useEffect } from 'react';

interface OrbitalDeathItemProps {
  cause: string;
  dailyDeaths: number;
  icon: string;
  color: string;
  description: string;
  deathsPerSecond: number;
  globalTime: number;
  orbitRadius: number;
  angle: number;
  animationDelay: number;
}

export const OrbitalDeathItem: React.FC<OrbitalDeathItemProps> = ({
  cause,
  dailyDeaths,
  icon,
  color,
  description,
  deathsPerSecond,
  globalTime,
  orbitRadius,
  angle,
  animationDelay
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  useEffect(() => {
    if (hasEntered) {
      const newCount = Math.floor(globalTime * deathsPerSecond);
      setCurrentCount(newCount);
    }
  }, [globalTime, deathsPerSecond, hasEntered]);

  if (!hasEntered) return null;

  const x = Math.cos((angle + globalTime * 0.01) * Math.PI / 180) * orbitRadius;
  const y = Math.sin((angle + globalTime * 0.01) * Math.PI / 180) * orbitRadius;

  return (
    <div
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer
        ${isHovered ? 'scale-125 z-50' : 'scale-100 z-10'}
      `}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.25 : 1})`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Orbital Path Glow */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20 blur-lg scale-150 animate-pulse`}></div>
      
      {/* Main Circle */}
      <div className={`
        relative w-24 h-24 rounded-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 
        border-2 border-gradient-to-r ${color} backdrop-blur-md shadow-2xl
        flex flex-col items-center justify-center text-center
        transition-all duration-300
      `}>
        {/* Glowing Edge */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-30 animate-pulse`}></div>
        
        {/* Icon */}
        <div className="relative z-10 text-2xl mb-1">{icon}</div>
        
        {/* Counter */}
        <div className={`relative z-10 text-xs font-mono font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {currentCount.toLocaleString()}
        </div>
      </div>

      {/* Hover Information */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/90 backdrop-blur-md rounded-xl p-4 min-w-48 animate-fade-in z-50">
          <div className="text-white text-sm font-semibold mb-1">{cause}</div>
          <div className={`text-xs bg-gradient-to-r ${color} bg-clip-text text-transparent font-mono mb-2`}>
            {currentCount.toLocaleString()} deaths
          </div>
          <div className="text-gray-400 text-xs italic">{description}</div>
          <div className="text-gray-500 text-xs mt-1">
            ~{deathsPerSecond.toFixed(3)} per second
          </div>
        </div>
      )}

      {/* Floating Particles for Active Items */}
      {globalTime > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: color.includes('red') ? '#ef4444' : '#06b6d4',
                left: `${30 + i * 20}%`,
                top: `${20 + (i % 2) * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
