import { FC } from 'react';

interface ScoreBoardProps {
  score: number;
  speed: number;
}

export const ScoreBoard: FC<ScoreBoardProps> = ({ score, speed }) => {
  return (
    <div className="mt-4 flex gap-4 justify-center items-center text-blue-500">
      <p className="text-lg font-semibold">
        Score: <span className="text-red-500">{score}</span>
      </p>
      <p className="text-lg font-semibold">
        Speed: <span className="text-red-500">{speed}</span>
      </p>
    </div>
  );
};
