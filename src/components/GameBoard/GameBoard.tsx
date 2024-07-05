import { useEffect, useState, FC, useCallback } from 'react';
import { HighScores } from '../HighScores/HighScores';
import { v4 as uuidv4 } from 'uuid';

interface GameBoardProps {
  playerName: string;
}

interface Position {
  x: number;
  y: number;
  id: string;
}

enum FoodType {
  SMALL = 1,
  MEDIUM = 5,
  LARGE = 10,
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
  const [paused, setPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 20;

  const moveSnake = useCallback(() => {
    setSnake(prev => {
      const newSnake = [...prev];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;
      head.id = uuidv4();
      newSnake.unshift(head);

      if (head.x === food.position.x && head.y === food.position.y) {
        setFood({
          position: {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
            id: uuidv4(),
          },
          type: [FoodType.SMALL, FoodType.MEDIUM, FoodType.LARGE][
            Math.floor(Math.random() * 3)
          ],
        });
        setScore(score + food.type);
        if ((score + food.type) % 50 === 0) {
          setSpeed(prev => prev - 20);
        }
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, food, score, boardSize]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setPaused(prev => !prev);
      }
      if (!paused) {
        switch (e.key) {
          case 'ArrowUp':
            setDirection({ x: 0, y: -1 });
            break;
          case 'ArrowDown':
            setDirection({ x: 0, y: 1 });
            break;
          case 'ArrowLeft':
            setDirection({ x: -1, y: 0 });
            break;
          case 'ArrowRight':
            setDirection({ x: 1, y: 0 });
            break;
        }
      }
    },
    [paused]
  );

  const checkCollision = useCallback(() => {
    const head = snake[0];
    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize
    ) {
      return true;
    }
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  }, [snake, boardSize]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKeyPress(e);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (!paused && !gameOver) {
      const interval = setInterval(() => {
        moveSnake();
        if (checkCollision()) {
          setGameOver(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [moveSnake, checkCollision, gameOver, speed, paused]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10, id: uuidv4() }]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setSpeed(200);
    setGameOver(false);
    setPaused(false);
  };

  return (
    <div className="flex flex-col items-center">
      {!gameOver ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Player: {playerName}</h1>
          <div className="bg-gray-800 w-96 h-96 relative">
            {snake.map(segment => (
              <div
                key={segment.id}
                className={`absolute ${
                  segment === snake[0] ? 'bg-green-700' : 'bg-green-500'
                }`}
                style={{
                  width: '5%',
                  height: '5%',
                  left: `${(segment.x / boardSize) * 100}%`,
                  top: `${(segment.y / boardSize) * 100}%`,
                }}
              ></div>
            ))}
            <div
              className={`absolute ${
                food.type === FoodType.SMALL
                  ? 'bg-red-500'
                  : food.type === FoodType.MEDIUM
                  ? 'bg-yellow-500'
                  : 'bg-blue-500'
              }`}
              style={{
                width: '5%',
                height: '5%',
                left: `${(food.position.x / boardSize) * 100}%`,
                top: `${(food.position.y / boardSize) * 100}%`,
              }}
            ></div>
            {paused && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl">
                Pause
              </div>
            )}
          </div>
          <div className="mt-4">
            <p>Score: {score}</p>
          </div>
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 bg-red-500 mr-2"></div>
              <p className="mr-4">1 point</p>
              <div className="w-5 h-5 bg-yellow-500 mr-2"></div>
              <p className="mr-4">5 points</p>
              <div className="w-5 h-5 bg-blue-500 mr-2"></div>
              <p>10 points</p>
            </div>
            <p className="mt-2">Press Space to pause/unpause the game</p>
          </div>
        </>
      ) : (
        <HighScores
          newScore={score}
          playerName={playerName}
          onReset={resetGame}
        />
      )}
    </div>
  );
};
