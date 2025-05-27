
import React from 'react';

interface CentralCounterProps {
  totalDeathsPerSecond: number;
  globalTime: number;
}

export const CentralCounter: React.FC<CentralCounterProps> = ({
  totalDeathsPerSecond,
  globalTime
}) => {
  const totalDeaths = Math.floor(globalTime * totalDeathsPerSecond);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      {/* Harmonized glow effect - matching orbital items */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/15 to-cyan-400/20 rounded-full blur-xl scale-125 animate-pulse"></div>
      
      {/* Main Container - harmonized with orbital style */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-full border-2 border-cyan-400/40 shadow-2xl flex flex-col items-center justify-center text-center"
           style={{
             width: '120px',
             height: '120px',
             boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
           }}>
        
        {/* Subtle orbital ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Content */}
        <div className="relative z-10 p-3">
          <div className="text-xs text-gray-300 mb-1 uppercase tracking-wider font-medium">Lives Lost</div>
          <div className="text-xs text-gray-400 mb-2 font-light">Since Watching</div>
          
          {/* Main Counter */}
          <div className="text-lg font-mono font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-1 animate-pulse">
            {totalDeaths.toLocaleString()}
          </div>
          
          {/* Rate Information */}
          <div className="text-xs text-gray-500">
            ~{totalDeathsPerSecond.toFixed(2)}/s
          </div>
        </div>
      </div>
    </div>
  );
};
