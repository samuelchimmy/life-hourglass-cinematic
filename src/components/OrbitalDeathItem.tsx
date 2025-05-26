
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

  // Smooth orbital motion - clockwise rotation with gentle bobbing
  const orbitSpeed = 0.3; // Slow, elegant speed
  const bobAmount = 1.5; // Gentle 1-2 pixel drift
  const bobSpeed = 0.05;
  
  const baseX = Math.cos((angle + globalTime * orbitSpeed) * Math.PI / 180) * orbitRadius;
  const baseY = Math.sin((angle + globalTime * orbitSpeed) * Math.PI / 180) * orbitRadius;
  
  // Add gentle bobbing motion
  const bobX = Math.cos(globalTime * bobSpeed + angle) * bobAmount;
  const bobY = Math.sin(globalTime * bobSpeed * 0.7 + angle) * bobAmount;
  
  const x = baseX + bobX;
  const y = baseY + bobY;

  return (
    <div
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
        transition-all duration-700 ease-out
        ${isHovered ? 'scale-125 z-50' : 'scale-100 z-10'}
      `}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: isHovered ? 
          'translate(-50%, -50%) scale(1.25)' : 
          'translate(-50%, -50%) scale(1.0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft orbital glow - no harsh blinking */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-15 blur-lg scale-150`}></div>
      
      {/* Main Circle */}
      <div className={`
        relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 
        border backdrop-blur-md shadow-2xl
        flex flex-col items-center justify-center text-center
        transition-all duration-500 ease-out
      `}
      style={{
        borderColor: color.includes('red') ? '#ef4444' : 
                    color.includes('blue') ? '#3b82f6' : 
                    color.includes('purple') ? '#8b5cf6' :
                    color.includes('green') ? '#10b981' :
                    color.includes('orange') ? '#f97316' :
                    color.includes('pink') ? '#ec4899' :
                    color.includes('cyan') ? '#06b6d4' :
                    color.includes('amber') ? '#f59e0b' :
                    color.includes('teal') ? '#14b8a6' :
                    color.includes('lime') ? '#84cc16' :
                    color.includes('gray') ? '#6b7280' :
                    color.includes('zinc') ? '#71717a' :
                    color.includes('rose') ? '#f43f5e' :
                    color.includes('black') ? '#374151' : '#06b6d4',
        borderWidth: '1px'
      }}>
        
        {/* Content */}
        <div className="relative z-10 p-2">
          {/* Icon */}
          <div className="text-xl mb-1">{icon}</div>
          
          {/* Cause Name */}
          <div className="text-xs font-semibold text-white mb-1 leading-tight">
            {cause.length > 20 ? `${cause.substring(0, 18)}...` : cause}
          </div>
          
          {/* Real-time Counter - removed blinking */}
          <div className={`text-sm font-mono font-bold text-white`}>
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
          <div className="text-gray-300 text-sm font-mono mb-2">
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

      {/* Gentle floating particles - no harsh animations */}
      {globalTime > 0 && currentCount > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(Math.min(2, Math.floor(currentCount / 20)))].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full opacity-40"
              style={{
                backgroundColor: color.includes('red') ? '#ef4444' : 
                               color.includes('blue') ? '#3b82f6' : '#06b6d4',
                left: `${30 + i * 25}%`,
                top: `${25 + (i % 2) * 50}%`,
                animation: `fadeInOut 6s ease-in-out infinite`,
                animationDelay: `${i * 2}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
