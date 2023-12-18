import { z } from 'zod';

export const createContactDto = z.object({
  categoryId: z.string().uuid(),

  name: z.string().min(1, 'name is required'),

  email: z.string().email().nullable(),

  phone: z.string().nullable(),
});
