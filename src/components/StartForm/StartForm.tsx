import { FC, useState } from 'react';
import { PlayIcon } from '@heroicons/react/20/solid';
import { z } from 'zod';

interface StartFormProps {
  onStartGame: (playerName: string) => Promise<void>;
  error: string;
  setError: (error: string) => void;
}

const nameSchema = z
  .string()
  .min(1, 'Name cannot be empty')
  .max(30, 'Name cannot exceed 30 characters');

export const StartForm: FC<StartFormProps> = ({
  onStartGame,
  error,
  setError,
}) => {
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      nameSchema.parse(playerName);
      await onStartGame(playerName);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleStartGame}>
      <h1 className="text-3xl font-bold mb-4 text-center">
        Welcome to the Snake Game!
      </h1>
      <p className="text-gray-600 mb-6 text-center">
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
  );
};
