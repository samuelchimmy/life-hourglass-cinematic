
import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const walletAddress = "0xfa2B8eD012f756E22E780B772d604af4575d5fcf";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <footer className="relative py-12 px-4 border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">About This Project</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              A cinematic data visualization exploring global mortality statistics. 
              Each number represents a human life, reminding us of our shared fragility and the importance of global health initiatives.
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Data Sources</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• World Health Organization (WHO)</li>
              <li>• Global Burden of Disease Study</li>
              <li>• Institute for Health Metrics</li>
              <li>• Our World in Data</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Support & Donate</h4>
            <div className="space-y-3">
              <div 
                onClick={copyToClipboard}
                className="bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-all duration-300 border border-gray-700"
              >
                <div className="text-xs text-gray-400 mb-1">Ethereum Address:</div>
                <div className="font-mono text-xs text-cyan-400 break-all">
                  {walletAddress}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {copied ? '✅ Copied!' : '📋 Click to copy'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            Built with ❤️ by{' '}
            <a 
              href="https://github.com/samuelchimmy?tab=repositories" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 underline"
            >
              JadeofWallstreet
            </a>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>© 2024 Daily Death Estimate</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time simulation</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-4xl mx-auto leading-relaxed">
            Disclaimer: This visualization uses estimated data for educational and awareness purposes. 
            Actual death rates may vary. The data represents approximate global averages and should not be used for medical or policy decisions. 
            This project aims to raise awareness about global health challenges and the preciousness of human life.
          </p>
        </div>
      </div>
    </footer>
  );
};
