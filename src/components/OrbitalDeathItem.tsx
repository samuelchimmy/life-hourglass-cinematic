
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
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Orbital Path Glow */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20 blur-lg scale-150 animate-pulse`}></div>
      
      {/* Main Circle */}
      <div className={`
        relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 
        border-2 backdrop-blur-md shadow-2xl
        flex flex-col items-center justify-center text-center
        transition-all duration-300 animate-pulse
      `}
      style={{
        borderImage: `linear-gradient(45deg, ${color.split(' ')[1]}, ${color.split(' ')[3]}) 1`,
        borderColor: 'transparent'
      }}>
        
        {/* Pulse Ring Effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-30 animate-ping`}></div>
        
        {/* Content */}
        <div className="relative z-10 p-2">
          {/* Icon */}
          <div className="text-xl mb-1">{icon}</div>
          
          {/* Cause Name */}
          <div className="text-xs font-semibold text-white mb-1 leading-tight">
            {cause.length > 20 ? `${cause.substring(0, 18)}...` : cause}
          </div>
          
          {/* Real-time Counter */}
          <div className={`text-sm font-mono font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent animate-pulse`}>
            {currentCount.toLocaleString()}
          </div>
          
          {/* Rate indicator */}
          <div className="text-xs text-gray-400 mt-1">
            +{deathsPerSecond.toFixed(3)}/s
          </div>
        </div>
      </div>

      {/* Enhanced Hover Information */}
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/95 backdrop-blur-md rounded-xl p-4 min-w-56 animate-fade-in z-50 border border-gray-700/50">
          <div className="text-white text-base font-semibold mb-2">{cause}</div>
          <div className={`text-sm bg-gradient-to-r ${color} bg-clip-text text-transparent font-mono mb-2`}>
            {currentCount.toLocaleString()} deaths since you started
          </div>
          <div className="text-gray-300 text-sm italic mb-2">{description}</div>
          <div className="text-gray-400 text-xs">
            Rate: ~{deathsPerSecond.toFixed(3)} deaths per second
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Daily average: {dailyDeaths.toLocaleString()} deaths
          </div>
        </div>
      )}

      {/* Floating Soul Particles */}
      {globalTime > 0 && currentCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(Math.min(3, Math.floor(currentCount / 10)))].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping opacity-60"
              style={{
                backgroundColor: color.includes('red') ? '#ef4444' : color.includes('blue') ? '#3b82f6' : '#06b6d4',
                left: `${30 + i * 20}%`,
                top: `${20 + (i % 2) * 60}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
