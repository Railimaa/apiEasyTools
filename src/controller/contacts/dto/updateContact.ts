import { z } from 'zod';

function formatPhoneNumber(value: string) {
  const numericOnly = value.replace(/\D/g, '');

  const formattedPhoneNumber = `(${numericOnly.substring(0, 2)}) ${numericOnly.substring(2)}`;

  return formattedPhoneNumber;
}

export const updateContactDto = z.object({
  categoryId: z.string().uuid(),

  name: z.string().min(1, 'name is required'),

  email: z.string().email().nullable(),

  phone: z.string().nullable(),
});
