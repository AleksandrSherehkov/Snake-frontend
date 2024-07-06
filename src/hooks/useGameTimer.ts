import { SetStateAction, useEffect, useRef } from 'react';

interface UseGameTimerProps {
  moveSnake: () => void;
  checkCollision: () => boolean;
  setGameOver: React.Dispatch<SetStateAction<boolean>>;
  paused: boolean;
  gameOver: boolean;
  speed: number;
}

export const useGameTimer = ({
  moveSnake,
  checkCollision,
  setGameOver,
  paused,
  gameOver,
  speed,
}: UseGameTimerProps) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!paused && !gameOver) {
      intervalRef.current = setInterval(() => {
        moveSnake();
        if (checkCollision()) {
          setGameOver(true);
        }
      }, speed);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [moveSnake, checkCollision, gameOver, speed, paused, setGameOver]);
};
