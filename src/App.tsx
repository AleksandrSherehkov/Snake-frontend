import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';
import { checkUniqueName, addOrUpdateScore } from './services/api';
import { PlayIcon } from '@heroicons/react/20/solid';

export const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState('');

  const handleStartGame = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName) {
      const isUnique = await checkUniqueName(playerName);
      if (!isUnique) {
        setError('The name is already in use, please select another.');
        return;
      }
      await addOrUpdateScore(playerName, 0);
      setGameStarted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-yellow-400">
      <div className="p-6 bg-white rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
        {!gameStarted ? (
          <form
            className="flex flex-col items-center"
            onSubmit={handleStartGame}
          >
            <h1 className="text-3xl font-bold mb-4 text-center">
              Welcome to the Snake Game!
            </h1>
            <p className="text-gray-600 mb-6 text-center">
              Enter your name to start playing. Use the arrow keys to move the
              snake.
            </p>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={e => {
                setPlayerName(e.target.value);
                setError('');
              }}
              className="mb-4 p-2 border border-gray-300 rounded shadow-inner w-full"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center"
            >
              <PlayIcon className="h-5 w-5 mr-2" />
              Start Game
            </button>
          </form>
        ) : (
          <GameBoard playerName={playerName} />
        )}
      </div>
    </div>
  );
};
