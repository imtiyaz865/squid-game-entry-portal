
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, RotateCcw } from 'lucide-react';

interface PlayerCardProps {
  playerName: string;
  playerId: string;
  selectedGame: string;
  onRestart: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ playerName, playerId, selectedGame, onRestart }) => {
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown
  const [easterEggSequence, setEasterEggSequence] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const gameNames = {
    'red-light-green-light': 'Red Light, Green Light',
    'marbles': 'Marbles',
    'glass-bridge': 'Glass Bridge'
  };

  const gameBackgrounds = {
    'red-light-green-light': 'from-green-900/20 to-red-900/20',
    'marbles': 'from-blue-900/20 to-purple-900/20',
    'glass-bridge': 'from-gray-900/20 to-blue-900/20'
  };

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Easter Egg Detection
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = [...easterEggSequence, e.key].slice(-8);
      setEasterEggSequence(newSequence);

      // Check for Konami Code: ↑↑↓↓←→←→BA
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
      const currentInput = newSequence.slice(-8);
      
      if (JSON.stringify(currentInput) === JSON.stringify(konamiCode)) {
        setShowEasterEgg(true);
        console.log('🎉 EASTER EGG UNLOCKED: Front Man Card!');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [easterEggSequence]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    console.log('📥 Downloading Player Card...');
    // Simulate download
  };

  const handleShare = () => {
    console.log('📤 Sharing Player Card...');
    // Simulate share
  };

  return (
    <div className="min-h-screen bg-squid-dark relative overflow-hidden">
      {/* Background Game Scene */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gameBackgrounds[selectedGame as keyof typeof gameBackgrounds]} opacity-30`}>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-squid-red/20 text-2xl animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['○', '△', '□', '♦'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <div className="bg-black/90 border-2 border-squid-neon rounded-xl p-8 backdrop-blur-lg max-w-md w-full shadow-[0_0_50px_#FF0040] animate-fade-in-up">
          
          {/* Card Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-squid text-squid-neon mb-2 animate-pulse">
              PLAYER CARD
            </h1>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-squid-red to-transparent"></div>
          </div>

          {/* Player Info */}
          <div className="space-y-6 mb-8">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 mx-auto bg-squid-dark border-2 border-squid-red rounded-full flex items-center justify-center">
                <span className="text-3xl font-squid text-squid-neon">
                  {playerName.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div>
                <h2 className="text-2xl font-squid text-white mb-1">
                  {playerName}
                </h2>
                <p className="text-squid-red font-squid text-lg">
                  Player #{playerId}
                </p>
              </div>
            </div>

            {/* Game Assignment */}
            <div className="bg-squid-dark/50 rounded-lg p-4 border border-squid-red/50">
              <p className="text-gray-400 font-squid text-sm mb-1">ASSIGNED GAME:</p>
              <p className="text-white font-squid text-lg">
                {gameNames[selectedGame as keyof typeof gameNames]}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="text-center">
              <p className="text-gray-400 font-squid text-sm mb-2">TIME UNTIL GAME STARTS:</p>
              <div className="text-4xl font-squid text-squid-neon animate-heartbeat">
                {formatTime(countdown)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-squid-purple hover:bg-squid-purple/80 text-white font-squid squid-cursor"
              >
                <Download size={16} />
                Download
              </Button>
              
              <Button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-squid-purple hover:bg-squid-purple/80 text-white font-squid squid-cursor"
              >
                <Share2 size={16} />
                Share
              </Button>
            </div>

            <Button
              onClick={onRestart}
              className="w-full flex items-center justify-center gap-2 bg-squid-neon hover:bg-squid-red text-black font-squid transition-all duration-300 hover:shadow-[0_0_30px_#FF0040] squid-cursor"
            >
              <RotateCcw size={16} />
              Register New Player
            </Button>
          </div>

          {/* Status */}
          <div className="text-center mt-6 pt-4 border-t border-squid-red/30">
            <p className="text-gray-500 font-squid text-xs animate-pulse">
              STATUS: REGISTERED • AWAITING GAME START
            </p>
          </div>
        </div>
      </div>

      {/* Easter Egg Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="bg-black border-2 border-gold rounded-lg p-8 text-center animate-fade-in-up">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-3xl font-squid text-yellow-400 mb-4">
              FRONT MAN CARD UNLOCKED!
            </h2>
            <p className="text-white font-squid mb-6">
              You've discovered the secret. You now have access to Front Man privileges.
            </p>
            <Button
              onClick={() => setShowEasterEgg(false)}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-squid squid-cursor"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Voice Effect Indicator */}
      <div className="absolute bottom-4 left-4 text-gray-600 text-xs font-squid animate-pulse">
        🔊 "Will you survive?" - Voice distorted
      </div>

      {/* Easter Egg Hint */}
      <div className="absolute bottom-4 right-4 text-gray-700 text-xs font-squid">
        Try: ↑↑↓↓←→←→ for secret...
      </div>
    </div>
  );
};

export default PlayerCard;
