import { FC, memo } from 'react';
import { Score } from '../../types/definitions';
import { Loader } from '../Loader/Loader';
import { TrophyIcon } from '@heroicons/react/24/solid';

interface HighScoresProps {
  highScores: Score[];
}

const trophyColors = ['text-yellow-500', 'text-gray-400', 'text-orange-600'];

export const HighScores: FC<HighScoresProps> = memo(({ highScores }) => {
  return (
    <div className="mb-4 p-4 bg-white shadow-lg rounded-lg" aria-live="polite">
      <h2 className="text-2xl font-extrabold mb-4 text-center text-indigo-600">
        High Scores
      </h2>
      {highScores.length === 0 ? (
        <Loader />
      ) : (
        <ol className="list-decimal flex flex-col items-center gap-2">
          {highScores.map((score, index) => (
            <li
              key={score.id}
              className="font-semibold flex items-center gap-2 p-1 bg-gray-50 rounded-lg shadow-md w-full transition-transform transform hover:scale-105"
            >
              <div className="flex items-center justify-center size-5">
                {index < 3 ? (
                  <TrophyIcon
                    className={`${trophyColors[index]} size-8 animate-bounce`}
                  />
                ) : (
                  <span className="text-blue-500 font-semibold text-lg">
                    {index + 1}.
                  </span>
                )}
              </div>
              <span className="text-blue-600 font-semibold text-lg">
                {score.name}:{' '}
              </span>
              <span className="text-gray-800 text-lg">{score.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
});
