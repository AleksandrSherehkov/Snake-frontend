import { FC, memo } from 'react';
import { Score } from '../../types/definitions';
import { Loader } from '../Loader/Loader';

interface HighScoresProps {
  highScores: Score[];
}

export const HighScores: FC<HighScoresProps> = memo(({ highScores }) => {
  return (
    <div className="mb-4" aria-live="polite">
      <h2 className="text-xl font-bold mb-4 text-center">High Scores</h2>
      {highScores.length === 0 ? (
        <Loader />
      ) : (
        <ol className="list-decimal flex flex-col items-center gap-1 ">
          {highScores.map(score => (
            <li key={score.id} className="font-semibold text-red-500">
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
