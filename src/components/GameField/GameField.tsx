import { FC, memo } from 'react';

import { Snake } from '../Snake/Snake';
import { Food } from '../Food/Food';
import { PauseOverlay } from '../PauseOverlay/PauseOverlay';

import { Position, Segment } from '../../types/definitions';

interface GameFieldProps {
  snakeSegments: Segment[];
  food: { position: Position; type: number };
  boardSize: number;
  paused: boolean;
}

export const GameField: FC<GameFieldProps> = memo(
  ({ snakeSegments, food, boardSize, paused }) => {
    return (
      <div
        className="bg-gray-800 w-96 h-96 relative border-4 border-gray-700 shadow-lg"
        aria-label="Game Field"
      >
        <Snake segments={snakeSegments} boardSize={boardSize} />
        <Food position={food.position} type={food.type} boardSize={boardSize} />
        {paused && <PauseOverlay />}
      </div>
    );
  }
);
