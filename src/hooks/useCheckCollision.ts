import { useCallback } from 'react';

interface Position {
  x: number;
  y: number;
  id: string;
}

interface UseCheckCollisionProps {
  snake: Position[];
  boardSize: number;
}

export const useCheckCollision = ({
  snake,
  boardSize,
}: UseCheckCollisionProps) => {
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

  return checkCollision;
};
