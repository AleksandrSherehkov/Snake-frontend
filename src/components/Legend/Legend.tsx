import { FC, memo } from 'react';

export const Legend: FC = memo(() => {
  return (
    <>
      <div className="flex items-center justify-center gap-2 my-3">
        <div className="size-5 bg-red-500 " aria-label="1 point food"></div>
        <p className="">1 point</p>
        <div className="size-5 bg-yellow-500 " aria-label="5 points food"></div>
        <p className="">5 points</p>
        <div className="size-5 bg-blue-500 " aria-label="10 points food"></div>
        <p>10 points</p>
      </div>
      <p className="text-blue-500 font-medium underline">
        Press Space to pause/unpause the game
      </p>
    </>
  );
});
