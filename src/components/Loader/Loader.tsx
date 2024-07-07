import { FC } from 'react';

export const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="snake-loader">
        <div className="snake-dot"></div>
        <div className="snake-dot"></div>
        <div className="snake-dot"></div>
        <div className="snake-dot"></div>
        <div className="snake-dot"></div>
      </div>
    </div>
  );
};
