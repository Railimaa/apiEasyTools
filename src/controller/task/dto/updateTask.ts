import { z } from 'zod';

const iso8601Date = z.string().refine((value) => {
  const date = new Date(value);
  return date.toISOString() === value;
}, {
  message: 'Invalid ISO 8601 date format',
});

export const updateTaskDto = z.object({
  categoryId: z.string().uuid(),

  name: z.string().min(1, 'Name is required'),

  description: z.string().optional(),

  dueDate: iso8601Date,

  done: z.boolean(),
});
