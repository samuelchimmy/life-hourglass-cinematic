
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
  orbitSpeed: number;
  itemSize: number;
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
  orbitSpeed,
  itemSize,
  animationDelay
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
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

  // Enhanced orbital motion with cubic-bezier easing
  const effectiveOrbitSpeed = isPaused ? 0 : orbitSpeed;
  const currentAngle = (angle + globalTime * effectiveOrbitSpeed) * Math.PI / 180;
  
  // Smooth orbital motion with slight depth variance
  const depthVariance = Math.sin(globalTime * 0.1 + angle) * 0.05; // Subtle depth drift
  const x = Math.cos(currentAngle) * orbitRadius * (1 + depthVariance);
  const y = Math.sin(currentAngle) * orbitRadius * (1 + depthVariance);

  // Pulse intensity based on death count updates
  const pulseIntensity = 1 + Math.sin(globalTime * 2 + angle) * 0.1;

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPaused(false);
  };

  return (
    <div
      className={`
        absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${isHovered ? 'scale-110 z-50' : 'scale-100 z-10'}
      `}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.1 : 1})`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic glow effect with pulse */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} blur-lg`}
        style={{
          opacity: 0.2 * pulseIntensity,
          transform: `scale(${1.3 + pulseIntensity * 0.2})`,
        }}
      ></div>
      
      {/* Main Circle with dynamic sizing */}
      <div 
        className={`
          relative rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 
          border backdrop-blur-md shadow-2xl
          flex flex-col items-center justify-center text-center
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        `}
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
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
          borderWidth: '2px',
          boxShadow: `0 0 ${20 * pulseIntensity}px ${color.includes('red') ? '#ef444440' : '#06b6d440'}`,
        }}
      >
        
        {/* Content with responsive sizing */}
        <div className="relative z-10 p-2">
          {/* Icon - size based on circle size */}
          <div 
            className="mb-1"
            style={{ fontSize: `${Math.max(14, itemSize * 0.15)}px` }}
          >
            {icon}
          </div>
          
          {/* Cause Name - responsive text */}
          <div 
            className="font-semibold text-white mb-1 leading-tight"
            style={{ 
              fontSize: `${Math.max(10, itemSize * 0.08)}px`,
              maxWidth: `${itemSize - 20}px`
            }}
          >
            {cause.length > (itemSize > 100 ? 25 : 15) ? 
              `${cause.substring(0, itemSize > 100 ? 23 : 13)}...` : 
              cause}
          </div>
          
          {/* Real-time Counter with pulse effect */}
          <div 
            className="font-mono font-bold text-white"
            style={{ 
              fontSize: `${Math.max(12, itemSize * 0.1)}px`,
              opacity: pulseIntensity,
            }}
          >
            {currentCount.toLocaleString()}
          </div>
          
          {/* Rate indicator */}
          <div 
            className="text-gray-400 mt-1"
            style={{ fontSize: `${Math.max(8, itemSize * 0.06)}px` }}
          >
            +{deathsPerSecond.toFixed(3)}/s
          </div>
        </div>
      </div>

      {/* Enhanced Hover Information - only show when paused */}
      {isHovered && isPaused && (
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
          <div className="text-cyan-400 text-xs mt-2 italic">
            Orbit paused - move cursor away to resume
          </div>
        </div>
      )}

      {/* Subtle orbital trail effect */}
      {!isPaused && globalTime > 0 && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-full"
          style={{
            background: `radial-gradient(circle, ${color.includes('red') ? '#ef444420' : '#06b6d420'} 0%, transparent 70%)`,
            transform: `scale(${0.8 + Math.sin(globalTime * 3) * 0.1})`,
            opacity: 0.3,
          }}
        />
      )}
    </div>
  );
};
