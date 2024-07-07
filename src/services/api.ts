import axios from 'axios';
import { handleError } from './errorHandler';

const api = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: 'https://snake-backend-jd8e.onrender.com/api',
});

export const getScores = async () => {
  try {
    const response = await api.get('/scores');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addOrUpdateScore = async (name: string, score: number) => {
  try {
    const response = await api.post('/scores', { name, score });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const checkUniqueName = async (name: string) => {
  try {
    const response = await api.post('/check-unique-name', { name });
    return response.data.isUnique;
  } catch (error) {
    handleError(error);
  }
};
