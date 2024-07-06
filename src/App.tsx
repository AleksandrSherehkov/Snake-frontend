import React, { useState } from 'react';
import { GameBoard } from './components/GameBoard/GameBoard';
import { StartForm } from './components/StartForm/StartForm';
import { useCheckNameAndScore } from './hooks/useCheckNameAndScore';

export const App: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const { error, handleStartGame, setError } = useCheckNameAndScore();

  const startGame = async (name: string) => {
    const isNameValid = await handleStartGame(name);
    if (isNameValid) {
      setPlayerName(name);
      setGameStarted(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-yellow-400">
      <div className="p-6 bg-white rounded-lg shadow-md w-11/12 md:w-1/2 lg:w-1/3">
        {!gameStarted ? (
          <StartForm
            onStartGame={startGame}
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
