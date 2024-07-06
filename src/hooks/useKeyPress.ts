import { useCallback } from 'react';

interface Direction {
  x: number;
  y: number;
}

export const useKeyPress = (
  setPaused: React.Dispatch<React.SetStateAction<boolean>>,
  setDirection: React.Dispatch<React.SetStateAction<Direction>>,
  paused: boolean
) => {
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
    [paused, setPaused, setDirection]
  );

  return handleKeyPress;
};
