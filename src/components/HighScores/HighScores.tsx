import { FC, memo } from 'react';
import { Score } from '../../types/definitions';
import { Loader } from '../Loader/Loader';
import { TrophyIcon } from '@heroicons/react/24/solid';

interface HighScoresProps {
  highScores: Score[];
}

const trophyColors = ['text-yellow-500', 'text-gray-400', 'text-orange-700'];

export const HighScores: FC<HighScoresProps> = memo(({ highScores }) => {
  return (
    <div className="mb-4" aria-live="polite">
      <h2 className="text-xl font-bold mb-4 text-center">High Scores</h2>
      {highScores.length === 0 ? (
        <Loader />
      ) : (
        <ol className="list-decimal flex flex-col items-center gap-1 ">
          {highScores.map((score, index) => (
            <li
              key={score.id}
              className="font-semibold text-red-500 flex items-center gap-2"
            >
              {index < 3 ? (
                <TrophyIcon className={`${trophyColors[index]} w-4 h-4`} />
              ) : (
                <span className="text-blue-500 font-semibold">
                  {index + 1}.
                </span>
              )}
              <span className="text-blue-500 font-semibold">
                {score.name}:{' '}
              </span>
              {score.score}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
});
