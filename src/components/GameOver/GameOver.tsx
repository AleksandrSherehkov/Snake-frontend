import { PlayIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

interface GameOverProps {
  newScore: number;
  playerName: string;
  onReset: () => void;
}

export const GameOver: FC<GameOverProps> = ({
  newScore,
  playerName,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-4xl font-bold  text-red-600 animate-bounce">
        Game Over
      </h2>
      <p className="text-2xl font-semibold  text-red-500 ">
        <span className="font-semibold text-blue-500 text-3xl">
          {playerName}:
        </span>{' '}
        {newScore}
      </p>
      <button
        onClick={onReset}
        className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105 flex items-center justify-center"
      >
        <PlayIcon className="h-6 w-6 mr-2" />
        Play Again
      </button>
    </div>
  );
};
