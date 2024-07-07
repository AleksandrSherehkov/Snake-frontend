import { FC } from 'react';

export const PauseOverlay: FC = () => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl"
      aria-live="assertive"
    >
      Pause
    </div>
  );
};
