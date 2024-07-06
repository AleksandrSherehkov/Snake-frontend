import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FoodType, Position } from '../types/definitions';

interface UseSnakeMovementProps {
  setSnake: React.Dispatch<React.SetStateAction<Position[]>>;
  direction: { x: number; y: number };
  food: { position: Position; type: FoodType };
  setFood: React.Dispatch<
    React.SetStateAction<{ position: Position; type: FoodType }>
  >;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  boardSize: number;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setDisplaySpeed: React.Dispatch<React.SetStateAction<number>>;
}

export const useSnakeMovement = ({
  setSnake,
  direction,
  food,
  setFood,
  score,
  setScore,
  boardSize,
  setSpeed,
  setDisplaySpeed,
}: UseSnakeMovementProps) => {
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
        const newScore = score + food.type;
        setScore(newScore);
        if (Math.floor(newScore / 50) > Math.floor(score / 50)) {
          setSpeed(prev => Math.max(prev - 10, 50));
          setDisplaySpeed(prev => prev + 0.5);
        }
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  }, [
    direction,
    food,
    score,
    boardSize,
    setSnake,
    setFood,
    setScore,
    setSpeed,
    setDisplaySpeed,
  ]);

  return moveSnake;
};
