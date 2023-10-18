import { z } from 'zod';

const iso8601Date = z.string().refine((value) => {
    const date = new Date(value);
    return date.toISOString() === value;
}, {
    message: 'Invalid ISO 8601 date format',
});

export const createTransactionDto = z.object({
    bankAccountId: z.string().min(1, 'BankaccountId is required').uuid(),

    categoryId: z.string().min(1, 'categoryId is required').uuid(),

    name: z.string().min(1, 'name is required'),

    value: z.number().min(1, 'value is required').positive(),

    date: iso8601Date,

    type: z.enum(['INCOME', 'EXPENSE'])
});
