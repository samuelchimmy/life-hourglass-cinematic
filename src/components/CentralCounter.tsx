
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
      {/* Enhanced Central Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-cyan-400/20 to-white/30 rounded-full blur-3xl scale-150 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-full blur-2xl scale-125 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* Main Container - Larger and more prominent */}
      <div className="relative bg-gradient-to-br from-white/95 to-gray-100/95 backdrop-blur-md rounded-full p-16 border-2 border-white/30 shadow-2xl">
        
        {/* Multiple Orbital Rings for constellation effect */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 animate-spin" style={{animationDuration: '8s'}}></div>
        <div className="absolute inset-2 rounded-full border border-purple-400/25 animate-spin" style={{animationDuration: '12s', animationDirection: 'reverse'}}></div>
        <div className="absolute inset-4 rounded-full border border-pink-400/20 animate-spin" style={{animationDuration: '16s'}}></div>
        <div className="absolute inset-6 rounded-full border border-white/15 animate-pulse" style={{animationDuration: '4s'}}></div>
        
        {/* Content */}
        <div className="relative z-10 text-center min-w-64">
          <div className="text-sm text-gray-700 mb-3 uppercase tracking-wider font-semibold">Lives Lost Since</div>
          <div className="text-lg text-gray-800 mb-6 font-medium">You Began Watching</div>
          
          {/* Main Counter - Enhanced */}
          <div className="text-5xl font-mono font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-700 bg-clip-text text-transparent mb-4 animate-pulse">
            {totalDeaths.toLocaleString()}
          </div>
          
          {/* Rate Information */}
          <div className="text-sm text-gray-600 mb-4">
            ~{totalDeathsPerSecond.toFixed(2)} per second
          </div>
          
          {/* Enhanced Heartbeat Visualization */}
          <div className="mt-6 h-8 flex items-center justify-center">
            <div className="relative w-32 h-2 bg-gray-200/50 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 animate-pulse rounded-full"></div>
              <div 
                className="absolute h-full bg-gradient-to-r from-transparent via-white to-transparent rounded-full animate-pulse"
                style={{
                  width: '20%',
                  animation: 'slideHeartbeat 2s ease-in-out infinite',
                }}
              ></div>
            </div>
          </div>
          
          {/* Constellation anchor indicator */}
          <div className="text-xs text-gray-500 mt-4 italic">
            ◊ Constellation Center ◊
          </div>
        </div>
      </div>
    </div>
  );
};
