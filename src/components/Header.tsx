
import React from 'react';

export const Header = () => {
  return (
    <header className="relative py-6 px-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Daily Deaths
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-400">
              Global Death Observatory
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">LIVE</span>
          </div>
        </nav>
      </div>
    </header>
  );
};
