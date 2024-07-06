import { useState, useCallback } from 'react';

import { checkUniqueName, addOrUpdateScore } from '../services/api';

export const useCheckNameAndScore = () => {
  const [error, setError] = useState('');

  const handleStartGame = useCallback(async (name: string) => {
    if (name) {
      try {
        const isUnique = await checkUniqueName(name);
        if (!isUnique) {
          setError('The name is already in use, please select another.');
          return;
        }
        await addOrUpdateScore(name, 0);
        setError('');
        return true;
      } catch (error) {
        console.error('Error during start game:', error);
        setError('An unexpected error occurred. Please try again.');
        return false;
      }
    }
  }, []);

  return { error, handleStartGame, setError };
};
