import { z } from 'zod';

export const updateDto = z.object({
  name: z.string().min(1, 'Informe o nome'),
  secondName: z.string().min(1, 'Informe o sobrenome'),
  email: z.string().email('Informe um email valido'),
  // password: z.string().min(8, 'Senha deve conter pelo menos 8 digitos'),
});
