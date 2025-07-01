
import React, { useState } from 'react';
import Preloader from '@/components/Preloader';
import EntryInterface from '@/components/EntryInterface';
import GameSelection from '@/components/GameSelection';
import PlayerCard from '@/components/PlayerCard';

type GameState = 'loading' | 'entry' | 'game-selection' | 'player-card';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('loading');
  const [playerData, setPlayerData] = useState({
    name: '',
    playerId: '',
    selectedGame: ''
  });

  const handlePreloaderComplete = () => {
    setGameState('entry');
  };

  const handlePlayerRegistered = (name: string, playerId: string) => {
    setPlayerData(prev => ({ ...prev, name, playerId }));
    setGameState('game-selection');
  };

  const handleGameSelected = (game: string) => {
    setPlayerData(prev => ({ ...prev, selectedGame: game }));
    setGameState('player-card');
  };

  const handleRestart = () => {
    setGameState('loading');
    setPlayerData({ name: '', playerId: '', selectedGame: '' });
  };

  return (
    <div className="min-h-screen bg-squid-dark">
      {gameState === 'loading' && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      
      {gameState === 'entry' && (
        <EntryInterface onPlayerRegistered={handlePlayerRegistered} />
      )}
      
      {gameState === 'game-selection' && (
        <GameSelection
          playerName={playerData.name}
          playerId={playerData.playerId}
          onGameSelected={handleGameSelected}
        />
      )}
      
      {gameState === 'player-card' && (
        <PlayerCard
          playerName={playerData.name}
          playerId={playerData.playerId}
          selectedGame={playerData.selectedGame}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
