
import React, { useEffect, useState } from 'react';

interface DeathCounterProps {
  cause: string;
  dailyDeaths: number;
  icon: string;
  color: string;
  particleColor: string;
  currentTime: number;
  index: number;
}

export const DeathCounter: React.FC<DeathCounterProps> = ({
  cause,
  dailyDeaths,
  icon,
  color,
  particleColor,
  currentTime,
  index
}) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  // Calculate deaths per second
  const deathsPerSecond = dailyDeaths / (24 * 60 * 60);
  
  useEffect(() => {
    const newCount = Math.floor(currentTime * deathsPerSecond);
    if (newCount > currentCount) {
      setCurrentCount(newCount);
      setShowPulse(true);
      setTimeout(() => setShowPulse(false), 300);
    } else {
      setCurrentCount(newCount);
    }
  }, [currentTime, deathsPerSecond, currentCount]);

  const percentage = (deathsPerSecond / (49000 / (24 * 60 * 60))) * 100; // Relative to cardiovascular (highest)

  return (
    <div 
      className={`relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-500 animate-fade-in`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: showPulse ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 rounded-2xl`}></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`text-3xl p-3 rounded-full bg-gradient-to-r ${color} bg-opacity-20 ${showPulse ? 'animate-pulse' : ''}`}>
            {icon}
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">{cause}</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Daily: {dailyDeaths.toLocaleString()} deaths</div>
              <div>Per second: {deathsPerSecond.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-4xl font-mono font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent ${showPulse ? 'animate-pulse' : ''}`}>
            {currentCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400 mt-1">
            deaths so far
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 relative">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 bg-gradient-to-r ${color} rounded-full transition-all duration-1000 relative overflow-hidden`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Relative impact scale
        </div>
      </div>

      {/* Floating particles */}
      {showPulse && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                backgroundColor: particleColor,
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
