import { FC, memo } from 'react';

import { Segment } from '../../types/definitions';

interface SnakeProps {
  segments: Segment[];
  boardSize: number;
}

export const Snake: FC<SnakeProps> = memo(({ segments, boardSize }) => {
  return (
    <>
      {segments.map(segment => (
        <div
          key={segment.id}
          className={`absolute ${
            segment.isHead ? 'bg-green-700 animate-pulse' : 'bg-green-500'
          }`}
          style={{
            width: '5%',
            height: '5%',
            left: `${(segment.x / boardSize) * 100}%`,
            top: `${(segment.y / boardSize) * 100}%`,
          }}
          role={segment.isHead ? 'head' : 'segment'}
        ></div>
      ))}
    </>
  );
});
