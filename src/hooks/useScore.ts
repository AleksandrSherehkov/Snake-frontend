import { useState } from 'react';

export const useScore = () => {
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [displaySpeed, setDisplaySpeed] = useState(1);

  const updateScoreAndSpeed = (points: number) => {
    const newScore = score + points;
    setScore(newScore);
    if (Math.floor(newScore / 50) > Math.floor(score / 50)) {
      setSpeed(prev => Math.max(prev - 10, 50));
      setDisplaySpeed(prev => prev + 0.5);
    }
  };

  return { score, speed, displaySpeed, updateScoreAndSpeed, setScore };
};
