
import React from 'react';

interface CumulativeCounterProps {
  totalDeathsPerSecond: number;
  globalTime: number;
}

export const CumulativeCounter: React.FC<CumulativeCounterProps> = ({
  totalDeathsPerSecond,
  globalTime
}) => {
  const totalDeaths = Math.floor(globalTime * totalDeathsPerSecond);

  return (
    <div className="fixed top-8 right-8 z-50 bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
      <div className="text-center">
        <div className="text-xs text-gray-400 mb-1">GLOBAL DEATHS</div>
        <div className="text-3xl font-mono font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
          {totalDeaths.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 mt-1">since you started watching</div>
      </div>
      
      {/* Heartbeat Line */}
      <div className="mt-4 h-8 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};
