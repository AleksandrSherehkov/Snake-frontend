import React, { useEffect, useState, FC, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { addOrUpdateScore, getScores } from '../../services/api';

import { useKeyPress } from '../../hooks/useKeyPress';
import { useSnakeMovement } from '../../hooks/useSnakeMovement';
import { useCheckCollision } from '../../hooks/useCheckCollision';
import { useGameTimer } from '../../hooks/useGameTimer';

import { GameOver } from '../GameOver/GameOver';
import { HighScores } from '../HighScores/HighScores';
import { Legend } from '../Legend/Legend';
import { ScoreBoard } from '../ScoreBoard/ScoreBoard';
import { GameField } from '../GameField/GameField';

import { FoodType, Position, Score, Segment } from '../../types/definitions';

interface GameBoardProps {
  playerName: string;
}

export const GameBoard: FC<GameBoardProps> = ({ playerName }) => {
  const [snake, setSnake] = useState<Position[]>([
    { x: 10, y: 10, id: uuidv4() },
  ]);
  const [direction, setDirection] = useState<{ x: number; y: number }>({
    x: 0,
    y: -1,
  });
  const [food, setFood] = useState<{ position: Position; type: FoodType }>({
    position: { x: 5, y: 5, id: uuidv4() },
    type: FoodType.SMALL,
  });
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [displaySpeed, setDisplaySpeed] = useState(1);
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScores, setHighScores] = useState<Score[]>([]);
  const handleKeyPress = useKeyPress(setPaused, setDirection, paused);
  const moveSnake = useSnakeMovement({
    setSnake,
    direction,
    food,
    setFood,
    score,
    setScore,
    boardSize: 20,
    setSpeed,
    setDisplaySpeed,
  });
  const checkCollision = useCheckCollision({ snake, boardSize: 20 });

  const boardSize = 20;

  useGameTimer({
    moveSnake,
    checkCollision,
    setGameOver,
    paused,
    gameOver,
    speed,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10, id: uuidv4() }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setSpeed(200);
    setDisplaySpeed(1);
    setGameOver(false);
    setPaused(false);
  }, []);

  useEffect(() => {
    if (gameOver) {
      const sendScore = async () => {
        try {
          await addOrUpdateScore(playerName, score);
          const scores = await getScores();
          setHighScores(scores);
        } catch (error) {
          console.error('Error adding or fetching scores:', error);
        }
      };

      sendScore();
    }
  }, [gameOver, playerName, score]);

  const snakeSegments: Segment[] = useMemo(
    () =>
      snake.map((segment, index) => ({
        ...segment,
        isHead: index === 0,
      })),
    [snake]
  );

  return (
    <div className="flex flex-col items-center">
      {!gameOver ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-blue-500">
            Player: <span className="text-red-500">{playerName}</span>
          </h1>
          <GameField
            snakeSegments={snakeSegments}
            food={food}
            boardSize={boardSize}
            paused={paused}
          />
          <ScoreBoard score={score} speed={displaySpeed} />
          <Legend />
        </>
      ) : (
        <>
          <HighScores highScores={highScores} />
          <GameOver
            newScore={score}
            playerName={playerName}
            onReset={resetGame}
          />
        </>
      )}
    </div>
  );
};
