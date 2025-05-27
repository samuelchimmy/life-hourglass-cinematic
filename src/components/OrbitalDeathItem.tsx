
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
  const animationRef = useRef<number>();

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

  // Fluid continuous animation using requestAnimationFrame
  useEffect(() => {
    if (!hasEntered) return;

    let startTime: number | null = null;
    
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      
      // Smooth continuous rotation with cubic-bezier easing
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      const currentAngle = (angle + elapsed * orbitSpeed * 10) * Math.PI / 180; // Faster rotation
      
      // Slight depth variance for natural drift
      const depthVariance = Math.sin(elapsed * 0.3 + angle * 0.01) * 0.03;
      const x = Math.cos(currentAngle) * orbitRadius * (1 + depthVariance);
      const y = Math.sin(currentAngle) * orbitRadius * (1 + depthVariance);
      
      // Subtle floating effect
      const floatOffset = Math.sin(elapsed * 1.2 + angle * 0.1) * 2;
      
      if (itemRef.current && !isHovered) {
        itemRef.current.style.left = `calc(50% + ${x}px)`;
        itemRef.current.style.top = `calc(50% + ${y + floatOffset}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasEntered, angle, orbitRadius, orbitSpeed, isHovered]);

  if (!hasEntered) return null;

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
    }, 150); // Slightly longer delay to prevent flickering
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
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-out"
      style={{
        transform: `translate(-50%, -50%) scale(${isHovered ? 1.3 : 1})`,
        zIndex: isHovered ? 50 : 10,
        transition: 'transform 0.5s cubic-bezier(0.42, 0, 0.58, 1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic glow effect with pulse */}
      <div 
        className="absolute inset-0 rounded-full blur-lg animate-pulse"
        style={{
          background: `radial-gradient(circle, ${borderColor}50, transparent)`,
          opacity: isHovered ? 0.6 : 0.3,
          transform: 'scale(1.5)',
          animation: `pulse 3s ease-in-out infinite`,
        }}
      ></div>
      
      {/* Main Circle */}
      <div 
        className="relative rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center transition-all duration-500"
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
          borderColor: borderColor,
          boxShadow: `0 0 ${isHovered ? 35 : 20}px ${borderColor}70`,
        }}
      >
        {/* Content */}
        <div className="relative z-10 p-2">
          {/* Icon */}
          <div 
            className="mb-1"
            style={{ fontSize: `${Math.max(14, itemSize * 0.12)}px` }}
          >
            {icon}
          </div>
          
          {/* Cause Name */}
          <div 
            className="font-semibold text-white mb-1 leading-tight"
            style={{ 
              fontSize: `${Math.max(10, itemSize * 0.07)}px`,
              maxWidth: `${itemSize - 15}px`
            }}
          >
            {cause.length > (itemSize > 120 ? 25 : 15) ? 
              `${cause.substring(0, itemSize > 120 ? 22 : 12)}...` : 
              cause}
          </div>
          
          {/* Real-time Counter */}
          <div 
            className="font-mono font-bold text-white"
            style={{ fontSize: `${Math.max(12, itemSize * 0.08)}px` }}
          >
            {currentCount.toLocaleString()}
          </div>
          
          {/* Rate indicator */}
          <div 
            className="text-gray-400 mt-1"
            style={{ fontSize: `${Math.max(8, itemSize * 0.05)}px` }}
          >
            +{deathsPerSecond.toFixed(3)}/s
          </div>
        </div>
      </div>

      {/* Enhanced Hover Information with smooth fade */}
      {isHovered && (
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-black/95 backdrop-blur-md rounded-xl p-5 min-w-64 z-50 border border-gray-700/50 pointer-events-none"
          style={{
            animation: 'fade-in 0.3s cubic-bezier(0.42, 0, 0.58, 1)',
          }}
        >
          <div className="text-white text-lg font-semibold mb-3">{cause}</div>
          <div className="text-gray-300 text-base font-mono mb-3">
            {currentCount.toLocaleString()} deaths since you started
          </div>
          <div className="text-gray-300 text-sm italic mb-3">{description}</div>
          <div className="text-gray-400 text-sm">
            Rate: ~{deathsPerSecond.toFixed(3)} deaths per second
          </div>
          <div className="text-gray-500 text-sm mt-2">
            Daily average: {dailyDeaths.toLocaleString()} deaths
          </div>
        </div>
      )}
    </div>
  );
};
