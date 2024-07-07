import { FC, memo } from 'react';

interface FoodProps {
  position: {
    x: number;
    y: number;
    id: string;
  };
  type: number;
  boardSize: number;
}

export const Food: FC<FoodProps> = memo(({ position, type, boardSize }) => {
  const foodColor =
    type === 1 ? 'bg-red-500' : type === 5 ? 'bg-yellow-500' : 'bg-blue-500';

  return (
    <div
      className={`absolute ${foodColor} animate-bounce`}
      style={{
        width: '5%',
        height: '5%',
        left: `${(position.x / boardSize) * 100}%`,
        top: `${(position.y / boardSize) * 100}%`,
      }}
      aria-label={`Food type ${type}`}
    ></div>
  );
});
