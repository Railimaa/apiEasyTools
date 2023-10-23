import { z } from 'zod';

export const updateCategoryTransactionDto = z.object({
  name: z.string().min(1, 'name is required'),

  icon: z.string().min(1, 'icon is required'),

  type: z.enum(['INCOME', 'EXPENSE']),
});
