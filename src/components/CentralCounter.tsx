
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
      {/* Central Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-150 animate-pulse"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md rounded-full p-12 border border-gray-700/50 shadow-2xl">
        
        {/* Orbital Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping" style={{animationDuration: '4s'}}></div>
        <div className="absolute inset-4 rounded-full border border-purple-400/20 animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
        <div className="absolute inset-8 rounded-full border border-pink-400/20 animate-ping" style={{animationDuration: '2s', animationDelay: '0.5s'}}></div>
        
        {/* Content */}
        <div className="relative z-10 text-center min-w-48">
          <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider">Lives Lost Since</div>
          <div className="text-sm text-gray-300 mb-4">You Began Watching</div>
          
          {/* Main Counter */}
          <div className="text-4xl font-mono font-bold bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 animate-pulse">
            {totalDeaths.toLocaleString()}
          </div>
          
          {/* Rate Information */}
          <div className="text-xs text-gray-500">
            ~{totalDeathsPerSecond.toFixed(2)} per second
          </div>
          
          {/* Heartbeat Line */}
          <div className="mt-4 h-6 flex items-center justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
