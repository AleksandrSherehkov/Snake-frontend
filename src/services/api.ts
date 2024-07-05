import axios from 'axios';
import { handleError } from './errorHandler';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getScores = async () => {
  try {
    const response = await api.get('/scores');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addScore = async (name: string, score: number) => {
  try {
    const response = await api.post('/scores', { name, score });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
