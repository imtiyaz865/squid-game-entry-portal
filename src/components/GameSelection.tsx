
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GameSelectionProps {
  playerName: string;
  playerId: string;
  onGameSelected: (game: string) => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ playerName, playerId, onGameSelected }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const games = [
    {
      id: 'red-light-green-light',
      name: 'Red Light, Green Light',
      description: 'Move when green, freeze when red. Get caught moving... elimination.',
      difficulty: 'HIGH RISK',
      icon: '🚦'
    },
    {
      id: 'marbles',
      name: 'Marbles',
      description: 'Win your partner\'s marbles. Friendship means nothing here.',
      difficulty: 'PSYCHOLOGICAL',
      icon: '⚪'
    },
    {
      id: 'glass-bridge',
      name: 'Glass Bridge',
      description: 'Choose wisely. Tempered glass holds, normal glass... doesn\'t.',
      difficulty: 'EXTREME',
      icon: '🌉'
    }
  ];

  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
    setIsTransitioning(true);
    
    // Play selection sound effect simulation
    console.log('🔊 BZZT! Game selected');
    
    setTimeout(() => {
      onGameSelected(gameId);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-squid-dark relative overflow-hidden">
      {/* Sliding Door Transition */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black z-50 animate-slide-door flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-spin">⚙️</div>
            <p className="text-squid-neon font-squid text-xl animate-glitch">
              Preparing Game Arena...
            </p>
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-squid-purple/20 to-transparent"></div>
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              {['○', '△', '□'][Math.floor(Math.random() * 3)]}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl font-squid text-squid-neon mb-4 animate-pulse">
            GAME SELECTION
          </h1>
          <div className="space-y-2">
            <p className="text-white font-squid text-xl">
              Welcome, <span className="text-squid-red">{playerName}</span>
            </p>
            <p className="text-squid-red font-squid text-lg">
              Player #{playerId}
            </p>
          </div>
        </div>

        {/* Game Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`bg-black/80 border-2 border-squid-red rounded-lg p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_#FF0040] squid-cursor animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-center space-y-4">
                {/* Game Icon */}
                <div className="text-6xl mb-4 animate-heartbeat">
                  {game.icon}
                </div>

                {/* Game Info */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-squid text-white">
                    {game.name}
                  </h3>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-squid ${
                    game.difficulty === 'HIGH RISK' ? 'bg-yellow-600 text-black' :
                    game.difficulty === 'PSYCHOLOGICAL' ? 'bg-purple-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {game.difficulty}
                  </div>

                  <p className="text-gray-300 text-sm font-squid leading-relaxed">
                    {game.description}
                  </p>
                </div>

                {/* Select Button */}
                <Button
                  onClick={() => handleGameSelect(game.id)}
                  className="w-full bg-squid-neon hover:bg-squid-red text-black font-squid text-lg py-6 transition-all duration-300 hover:shadow-[0_0_30px_#FF0040] squid-cursor"
                  disabled={isTransitioning}
                >
                  SELECT GAME
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Warning Footer */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-gray-500 font-squid text-sm animate-pulse">
            ⚠️ WARNING: Game selection is final. Elimination is permanent.
          </p>
        </div>

        {/* Sound Effects Indicator */}
        <div className="absolute bottom-4 right-4 text-gray-600 text-xs font-squid">
          🔊 Ambient: Whispers and machinery
        </div>
      </div>
    </div>
  );
};

export default GameSelection;
