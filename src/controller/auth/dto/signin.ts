import { z } from 'zod';

export const signin = z.object({
  email: z.string().email('Informe um email valido').min(1, 'Email is required'),

  password: z.string().min(8, 'Senha deve conter pelo menos 8 digitos'),
});
