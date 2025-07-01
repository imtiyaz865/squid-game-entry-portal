
import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('Connecting to Game Server...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(onComplete, 1000);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 100);

    const glitchInterval = setInterval(() => {
      const glitchTexts = [
        'Connecting to Game Server...',
        'C0nn3ct1ng t0 G4m3 S3rv3r...',
        'C̴o̵n̶n̵e̶c̸t̶i̷n̸g̷ ̴t̵o̶ ̷G̸a̶m̵e̷ ̵S̸e̶r̵v̶e̸r̷.̴.̵.̶',
        'Connecting to Game Server...'
      ];
      setGlitchText(glitchTexts[Math.floor(Math.random() * glitchTexts.length)]);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-squid-dark flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-8 h-8 border-2 border-squid-red rotate-45"></div>
        <div className="absolute top-40 right-32 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-squid-red"></div>
        <div className="absolute bottom-32 left-40 w-8 h-8 rounded-full border-2 border-squid-red"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 border-2 border-squid-red rotate-45"></div>
      </div>

      <div className="text-center space-y-12">
        {/* 3D Rotating Shapes */}
        <div className="flex justify-center space-x-8 mb-12">
          {/* Circle */}
          <div className="w-16 h-16 rounded-full border-4 border-squid-neon animate-spin-3d shadow-[0_0_30px_#FF0040]"></div>
          
          {/* Triangle */}
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-squid-neon animate-spin-3d shadow-[0_0_30px_#FF0040]" 
               style={{ 
                 filter: 'drop-shadow(0 0 30px #FF0040)',
                 animationDelay: '0.5s' 
               }}>
          </div>
          
          {/* Square */}
          <div className="w-16 h-16 border-4 border-squid-neon rotate-45 animate-spin-3d shadow-[0_0_30px_#FF0040]" 
               style={{ animationDelay: '1s' }}>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-6">
          <h1 className="text-squid-neon text-2xl font-squid animate-glitch">
            {glitchText}
          </h1>
          
          {/* Progress Bar */}
          <div className="w-80 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-squid-neon to-squid-red transition-all duration-300 animate-heartbeat"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <p className="text-squid-red text-lg font-squid">
            {Math.floor(progress)}%
          </p>
        </div>

        {/* Warning Text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-500 text-sm font-squid animate-pulse">
            WARNING: Game participation may result in elimination
          </p>
        </div>
      </div>

      {/* Ambient Background Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-squid-purple/20 to-transparent animate-spotlight"></div>
    </div>
  );
};

export default Preloader;
