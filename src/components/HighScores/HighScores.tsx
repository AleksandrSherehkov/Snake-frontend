import { useState, useEffect, FC } from 'react';

interface HighScoresProps {
  newScore: number;
  playerName: string;
  onReset: () => void;
}

interface Score {
  name: string;
  score: number;
}

export const HighScores: FC<HighScoresProps> = ({
  newScore,
  playerName,
  onReset,
}) => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  useEffect(() => {
    if (
      newScore > 0 &&
      !scores.some(
        score => score.name === playerName && score.score === newScore
      )
    ) {
      const updatedScores = [...scores, { name: playerName, score: newScore }]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      setScores(updatedScores);
      localStorage.setItem('highScores', JSON.stringify(updatedScores));
    }
  }, [newScore, playerName]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">High Scores</h2>
      <ul className="mb-4">
        {scores.map((score, index) => (
          <li key={index} className="text-lg">
            {score.name}: {score.score}
          </li>
        ))}
      </ul>
      <button
        onClick={onReset}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Play Again
      </button>
    </div>
  );
};
