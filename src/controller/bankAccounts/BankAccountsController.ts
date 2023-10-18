import { Request, Response } from 'express';
import { createBankAccountDto } from './dto/createBankAccountDto';
import { z } from 'zod';
import BankAccountsRepository from '../../repositories/BankAccountsRepository';
import { updateBankAccountDto } from './dto/updateBankAccountDto';
import { isValidUUID } from '../../utils/isValidUUID';

class BankAccountsController {
    async findAll(req: Request, res: Response) {
        const userId = req.userId;

        const listBankAccounts = await BankAccountsRepository.findAllByUserId(userId);

        res.json(listBankAccounts);
    }

    async create(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { name, initialBalance, type, color } = createBankAccountDto.parse(req.body);

            const newBankAccount = await BankAccountsRepository.create({
                userId,
                name,
                initialBalance,
                type,
                color
            });

            res.json(newBankAccount);
        }
        catch(err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json(err);
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { bankAccountId } = req.params;
            const { name, initialBalance, type, color } = updateBankAccountDto.parse(req.body);

            if (!isValidUUID(bankAccountId)) {
                return res.status(400).json({ message: 'invalid uuid' });
            }

            const isOwner = await BankAccountsRepository.findFirst(bankAccountId, userId);

            if (!isOwner) {
                return res.status(400).json({ message: 'bank account not found' });
            }

            const updateBankAccount = await BankAccountsRepository.update({
                bankAccountId,
                name,
                initialBalance,
                type,
                color
            });

            res.json(updateBankAccount);
        }
        catch(err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json(err);
            } else {
                return res.status(500).json({ message: 'Error in server' });
            }
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const { bankAccountId } = req.params;

            if (!isValidUUID(bankAccountId)) {
                return res.status(400).json({ message: 'invalid uuid' });
            }

            const isOwner = await BankAccountsRepository.findFirst(bankAccountId, userId);

            if (!isOwner) {
                return res.status(400).json({ message: 'bank account not found' });
            }

            await BankAccountsRepository.remove(bankAccountId);

            res.sendStatus(204);
        }
        catch(err) {
            return res.status(400).json({ message: err });
        }
    }



}

export default new BankAccountsController;
