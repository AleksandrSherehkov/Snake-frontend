import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(1, 'Name cannot be empty')
  .max(30, 'Name cannot exceed 30 characters');
