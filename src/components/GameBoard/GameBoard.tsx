import React, { useEffect, useState } from 'react';

interface GameBoardProps {
  playerName: string;
}

export const GameBoard: React.FC<GameBoardProps> = ({ playerName }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Player: {playerName}</h1>
      <div className="bg-gray-800 w-96 h-96 relative"></div>
      <div className="mt-4">
        <p>Score: {score}</p>
      </div>
    </div>
  );
};
