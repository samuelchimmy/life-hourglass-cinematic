
import React from 'react';

interface TimelineSliderProps {
  currentTime: number;
  onTimeChange: (time: number) => void;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentTime,
  onTimeChange
}) => {
  const maxTime = 24 * 60 * 60; // 24 hours in seconds

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-16 mb-8">
      <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
        <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Timeline Control
        </h3>
        
        <div className="space-y-6">
          <div className="relative">
            <input
              type="range"
              min="0"
              max={maxTime}
              value={currentTime}
              onChange={(e) => onTimeChange(Number(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${(currentTime / maxTime) * 100}%, #374151 ${(currentTime / maxTime) * 100}%, #374151 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>00:00:00</span>
              <span className="font-mono text-cyan-400 text-lg">
                {formatTime(currentTime)}
              </span>
              <span>24:00:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => onTimeChange(0)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
            >
              Start of Day
            </button>
            <button
              onClick={() => onTimeChange(6 * 3600)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
            >
              6 AM
            </button>
            <button
              onClick={() => onTimeChange(12 * 3600)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
            >
              Noon
            </button>
            <button
              onClick={() => onTimeChange(18 * 3600)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
            >
              6 PM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
