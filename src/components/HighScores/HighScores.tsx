import { FC } from 'react';

interface HighScoresProps {
  newScore: number;
  playerName: string;
  onReset: () => void;
}

export const HighScores: FC<HighScoresProps> = ({
  newScore,
  playerName,
  onReset,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Game Over</h2>
      <p className="text-lg mb-4">
        {playerName}: {newScore}
      </p>
      <button
        onClick={onReset}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Again
      </button>
    </div>
  );
};
