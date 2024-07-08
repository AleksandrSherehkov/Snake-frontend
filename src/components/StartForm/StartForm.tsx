import { FC, useState } from 'react';
import { z } from 'zod';
import { PlayIcon } from '@heroicons/react/20/solid';

import { Loader } from '../Loader/Loader';
import { nameSchema } from './validations';

interface StartFormProps {
  onStartGame: (playerName: string) => Promise<void>;
  error: string;
  setError: (error: string) => void;
}

export const StartForm: FC<StartFormProps> = ({
  onStartGame,
  error,
  setError,
}) => {
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      nameSchema.parse(playerName);
      setLoading(true);
      await onStartGame(playerName);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      onSubmit={handleStartGame}
      aria-labelledby="start-form-title"
    >
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Welcome to the Snake Game!
      </h1>
      <p className="text-gray-600 mb-6 text-center text-lg leading-relaxed animate-pulse">
        Enter your name to start playing. Use the arrow keys to move the snake.
      </p>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={e => {
          setPlayerName(e.target.value);
          setError('');
        }}
        className="mb-4 p-3 border border-gray-300 rounded-lg shadow-inner w-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent transition-all duration-300"
        aria-label="Enter your name"
      />
      {error && (
        <p className="text-red-500 mb-4" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center"
        aria-label="Start Game"
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <PlayIcon className="size-5 mr-2" aria-hidden="true" />
            Start Game
          </>
        )}
      </button>
    </form>
  );
};
