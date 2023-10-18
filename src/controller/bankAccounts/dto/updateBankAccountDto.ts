import { z } from 'zod';

function isValidHexColor(color: string) {
    const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hexColorRegex.test(color);
}

export const updateBankAccountDto = z.object({
    name: z.string().min(1, 'name is required'),

    initialBalance: z.number().min(1, 'initial balance is required'),

    type: z.enum(['CHECKING',  'INVESTMENT',  'CASH']),

    color: z.string().min(1, 'color is required').refine(isValidHexColor, {
        message: 'Invalid hexadecimal color'
    })
});

