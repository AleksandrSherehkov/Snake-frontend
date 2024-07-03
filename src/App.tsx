import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';

export const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    if (playerName) {
      setGameStarted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!gameStarted ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleStartGame}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Game
          </button>
        </div>
      ) : (
        <GameBoard playerName={playerName} />
      )}
    </div>
  );
};
