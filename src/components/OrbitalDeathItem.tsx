
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

// Smart text fitting utilities
const calculateOptimalFontSize = (text: string, maxWidth: number, maxHeight: number, baseSize: number) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return baseSize;
  
  let fontSize = baseSize;
  const minFontSize = Math.max(8, baseSize * 0.5);
  const maxFontSize = baseSize;
  
  while (fontSize >= minFontSize) {
    context.font = `${fontSize}px Inter, sans-serif`;
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize * 1.2; // Approximate line height
    
    if (textWidth <= maxWidth && textHeight <= maxHeight) {
      return fontSize;
    }
    fontSize -= 0.5;
  }
  
  return minFontSize;
};

const breakTextIntoLines = (text: string, maxWidth: number, fontSize: number) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return [text];
  
  context.font = `${fontSize}px Inter, sans-serif`;
  
  // If text fits in one line, return as is
  if (context.measureText(text).width <= maxWidth) {
    return [text];
  }
  
  // Smart word breaking
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = context.measureText(testLine).width;
    
    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Word is too long, break it
        lines.push(word);
      }
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  // Limit to 2 lines maximum
  return lines.slice(0, 2);
};

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

  // Calculate dynamic sizing and text properties
  const padding = Math.max(10, itemSize * 0.08); // Dynamic padding: 8% of size, minimum 10px
  const availableWidth = itemSize - (padding * 2);
  const availableHeight = itemSize - (padding * 2);
  
  // Icon sizing
  const iconSize = Math.max(16, Math.min(32, itemSize * 0.15));
  
  // Text sizing calculations
  const baseCauseSize = Math.max(10, itemSize * 0.09);
  const baseCounterSize = Math.max(9, itemSize * 0.08);
  const baseRateSize = Math.max(7, itemSize * 0.06);
  
  // Smart text fitting
  const causeLines = breakTextIntoLines(cause, availableWidth * 0.9, baseCauseSize);
  const maxCauseLineWidth = Math.max(...causeLines.map(line => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = `${baseCauseSize}px Inter, sans-serif`;
    return context.measureText(line).width;
  }));
  
  const optimalCauseSize = calculateOptimalFontSize(
    causeLines[0], 
    availableWidth * 0.9, 
    (availableHeight * 0.4) / causeLines.length, 
    baseCauseSize
  );
  
  const counterText = currentCount.toLocaleString();
  const optimalCounterSize = calculateOptimalFontSize(
    counterText, 
    availableWidth * 0.9, 
    availableHeight * 0.2, 
    baseCounterSize
  );
  
  const rateText = `+${deathsPerSecond.toFixed(3)}/s`;
  const optimalRateSize = calculateOptimalFontSize(
    rateText, 
    availableWidth * 0.9, 
    availableHeight * 0.15, 
    baseRateSize
  );

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
      
      const elapsed = (currentTime - startTime) / 1000;
      const currentAngle = (angle + elapsed * orbitSpeed * 10) * Math.PI / 180;
      
      const depthVariance = Math.sin(elapsed * 0.3 + angle * 0.01) * 0.03;
      const x = Math.cos(currentAngle) * orbitRadius * (1 + depthVariance);
      const y = Math.sin(currentAngle) * orbitRadius * (1 + depthVariance);
      
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

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

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
      {/* Dynamic glow effect */}
      <div 
        className="absolute inset-0 rounded-full blur-lg animate-pulse"
        style={{
          background: `radial-gradient(circle, ${borderColor}50, transparent)`,
          opacity: isHovered ? 0.6 : 0.3,
          transform: 'scale(1.5)',
          animation: `pulse 3s ease-in-out infinite`,
        }}
      ></div>
      
      {/* Main Circle with smart content layout */}
      <div 
        className="relative rounded-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center transition-all duration-500"
        style={{
          width: `${itemSize}px`,
          height: `${itemSize}px`,
          borderColor: borderColor,
          boxShadow: `0 0 ${isHovered ? 35 : 20}px ${borderColor}70`,
          padding: `${padding}px`,
        }}
      >
        {/* Smart content layout with measured spacing */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          {/* Icon with dynamic sizing */}
          <div 
            className="flex-shrink-0 mb-1"
            style={{ 
              fontSize: `${iconSize}px`,
              lineHeight: 1,
            }}
          >
            {icon}
          </div>
          
          {/* Cause name with smart line breaking */}
          <div 
            className="font-semibold text-white text-center leading-tight flex-grow flex flex-col justify-center mb-1"
            style={{ 
              fontSize: `${optimalCauseSize}px`,
              lineHeight: 1.1,
            }}
          >
            {causeLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
          
          {/* Real-time Counter with optimal sizing */}
          <div 
            className="font-mono font-bold text-white flex-shrink-0 mb-1"
            style={{ 
              fontSize: `${optimalCounterSize}px`,
              lineHeight: 1,
            }}
          >
            {counterText}
          </div>
          
          {/* Rate indicator with optimal sizing */}
          <div 
            className="text-gray-400 flex-shrink-0"
            style={{ 
              fontSize: `${optimalRateSize}px`,
              lineHeight: 1,
            }}
          >
            {rateText}
          </div>
        </div>
      </div>

      {/* Enhanced Hover Information */}
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
