
import React, { useState, useEffect, useRef } from 'react';

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
  const [hasEntered, setHasEntered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const itemRef = useRef<HTMLDivElement>(null);

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

  // Smooth continuous rotation with slight depth variance
  const currentAngle = (angle + globalTime * orbitSpeed * 0.5) * Math.PI / 180;
  const depthVariance = Math.sin(globalTime * 0.05 + angle) * 0.02;
  const x = Math.cos(currentAngle) * orbitRadius * (1 + depthVariance);
  const y = Math.sin(currentAngle) * orbitRadius * (1 + depthVariance);

  // Subtle floating effect
  const floatOffset = Math.sin(globalTime * 0.8 + angle * 0.1) * 1.5;

  // Stable hover handlers to prevent flickering
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  // Color mapping for borders and glows
  const getBorderColor = () => {
    if (color.includes('red')) return '#ef4444';
    if (color.includes('purple')) return '#8b5cf6';
    if (color.includes('orange')) return '#f97316';
    if (color.includes('blue')) return '#3b82f6';
    if (color.includes('pink')) return '#ec4899';
    if (color.includes('amber')) return '#f59e0b';
    if (color.includes('green')) return '#10b981';
    if (color.includes('teal')) return '#14b8a6';
    if (color.includes('gray')) return '#6b7280';
    if (color.includes('lime')) return '#84cc16';
    if (color.includes('zinc')) return '#71717a';
    if (color.includes('rose')) return '#f43f5e';
    return '#06b6d4';
  };

  const borderColor = getBorderColor();

  return (
    <div
      ref={itemRef}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y + floatOffset}px)`,
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
        zIndex: isHovered ? 50 : 10,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-lg animate-pulse"
        style={{
          background: `radial-gradient(circle, ${borderColor}40, transparent)`,
          opacity: isHovered ? 0.4 : 0.2,
          transform: 'scale(1.4)',
        }}
      ></div>
      
      {/* Main Circle */}
      <div 
        className="relative rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center transition-all duration-300"
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
          borderColor: borderColor,
          boxShadow: `0 0 ${isHovered ? 25 : 15}px ${borderColor}60`,
        }}
      >
        {/* Content */}
        <div className="relative z-10 p-1">
          {/* Icon */}
          <div 
            className="mb-0.5"
            style={{ fontSize: `${Math.max(12, itemSize * 0.15)}px` }}
          >
            {icon}
          </div>
          
          {/* Cause Name */}
          <div 
            className="font-semibold text-white mb-0.5 leading-tight"
            style={{ 
              fontSize: `${Math.max(8, itemSize * 0.08)}px`,
              maxWidth: `${itemSize - 10}px`
            }}
          >
            {cause.length > (itemSize > 80 ? 20 : 12) ? 
              `${cause.substring(0, itemSize > 80 ? 18 : 10)}...` : 
              cause}
          </div>
          
          {/* Real-time Counter */}
          <div 
            className="font-mono font-bold text-white"
            style={{ fontSize: `${Math.max(10, itemSize * 0.1)}px` }}
          >
            {currentCount.toLocaleString()}
          </div>
          
          {/* Rate indicator */}
          <div 
            className="text-gray-400 mt-0.5"
            style={{ fontSize: `${Math.max(6, itemSize * 0.06)}px` }}
          >
            +{deathsPerSecond.toFixed(3)}/s
          </div>
        </div>
      </div>

      {/* Stable Hover Information */}
      {isHovered && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-black/95 backdrop-blur-md rounded-xl p-4 min-w-56 z-50 border border-gray-700/50 pointer-events-none"
          style={{
            animation: 'fade-in 0.2s ease-out',
          }}
        >
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
    </div>
  );
};
