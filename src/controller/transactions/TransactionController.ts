import { Request, Response } from 'express';
import TransactionsRepository from '../../repositories/TransactionsRepository';
import { createTransactionDto } from './dto/createTransactionDto';
import { z } from 'zod';
import { updateTransactionDto } from './dto/updateTransactionDto';
import { isValidUUID } from '../../utils/isValidUUID';

class TransactionController {
    async findAll(req: Request, res: Response) {
        const userId  = req.userId;
        const { month, year } = req.query;

        const Month = Number(month);
        const Year = Number(year);

        if (!Month || !Year) {
            return res.status(400).json({ message: 'query params is required' });
        }

        const listTransactions = await TransactionsRepository.findAllByUserId(userId, { Month, Year });

        console.log({ Month, Year });

        res.json(listTransactions);
    }

    async create(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { bankAccountId, categoryId, name, type, date, value} = createTransactionDto.parse(req.body);

            const isOwnerBankAccountId = await TransactionsRepository.findFirstBankAccount(bankAccountId, userId);
            const isOwnerCategoryId = await TransactionsRepository.findFirstCategoryTransaction(categoryId, userId);

            if (!isOwnerBankAccountId) {
                return res.status(400).json({ message: 'Bank account not found' });
            }

            if (!isOwnerCategoryId) {
                return res.status(400).json({ message: 'Category transaction not found' });
            }

            const transaction = await TransactionsRepository.create({
                userId,
                bankAccountId,
                categoryId,
                name,
                type,
                date,
                value
            });


            res.json(transaction);
        }
        catch(err) {
            console.error('Erro na criação da transação:', err); // Adicione esta linha para registrar o erro no console


            if (err instanceof z.ZodError) {
                return res.status(400).json(err);
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }

    async update (req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { transactionId } = req.params;
            const { bankAccountId, categoryId, date, name, type, value } = updateTransactionDto.parse(req.body);

            if(!isValidUUID(transactionId)) {
                return res.status(400).json({ message: 'Invalid uuid' });
            }

            const isOwnerTransaction = await TransactionsRepository.findFirstTransaction(transactionId, userId);
            const isOwnerBankAccount = await TransactionsRepository.findFirstBankAccount(bankAccountId, userId);
            const isOwnerCategoryTransaction = await TransactionsRepository.findFirstCategoryTransaction(categoryId, userId);

            if (!isOwnerTransaction) {
                return res.status(400).json({ message: 'Transaction not found' });
            }

            if (!isOwnerBankAccount) {
                return res.status(400).json({ message: 'Bank account not found' });
            }

            if (!isOwnerCategoryTransaction) {
                return res.status(400).json({ message: 'Category not found' });
            }


            const updateTransaction = await TransactionsRepository.update({
                transactionId,
                bankAccountId,
                categoryId,
                date,
                name,
                type,
                value
            });

            res.json(updateTransaction);
        }
        catch(err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ message: err });
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }

    async remove(req: Request, res: Response) {
        const userId = req.userId;
        const { transactionId } = req.params;

        if(!isValidUUID(transactionId)) {
            return res.status(400).json({ message: 'Invalid uuid' });
        }

        const isOwner = await TransactionsRepository.findFirstTransaction(transactionId, userId);

        if (!isOwner) {
            return res.status(400).json({ message: 'Transaction not found' });
        }

        await TransactionsRepository.remove(transactionId);

        res.sendStatus(204);
    }
}


export default new TransactionController;
