import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';
import { checkUniqueName, addOrUpdateScore } from './services/api';
import { StartForm } from './components/StartForm/StartForm';

export const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState('');

  const handleStartGame = async (name: string) => {
    if (name) {
      try {
        const isUnique = await checkUniqueName(name);
        if (!isUnique) {
          setError('The name is already in use, please select another.');
          return;
        }
        await addOrUpdateScore(name, 0);
        setPlayerName(name);
        setGameStarted(true);
      } catch (error) {
        console.error('Error during start game:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-yellow-400">
      <div className="p-6 bg-white rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
        {!gameStarted ? (
          <StartForm
            onStartGame={handleStartGame}
            error={error}
            setError={setError}
          />
        ) : (
          <GameBoard playerName={playerName} />
        )}
      </div>
    </div>
  );
};
