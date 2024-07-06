import { FC, memo } from 'react';

import { Score } from '../../types/definitions';

interface HighScoresProps {
  highScores: Score[];
}

export const HighScores: FC<HighScoresProps> = memo(({ highScores }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">High Scores</h2>
      <ol className="list-decimal flex flex-col items-center gap-1 mt-4">
        {highScores.map(score => (
          <li key={score.id} className="font-semibold text-red-500">
            <span className="text-blue-500 font-semibold">{score.name}: </span>
            {score.score}
          </li>
        ))}
      </ol>
    </div>
  );
});
