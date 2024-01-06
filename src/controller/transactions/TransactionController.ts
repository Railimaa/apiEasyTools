/* eslint-disable max-len */
import { Request, Response } from 'express';
import { z } from 'zod';

import TransactionsRepository from '../../repositories/TransactionsRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { createTransactionDto } from './dto/createTransactionDto';
import { updateTransactionDto } from './dto/updateTransactionDto';
import { TransactionsType } from './entities/TransactionsType';

class TransactionController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;
    const {
      month, year, bankAccountId, type,
    } = req.query;

    if (typeof bankAccountId !== 'string' && typeof bankAccountId !== 'undefined') {
      return res.status(400).json({ message: 'query params bankAccount must be string' });
    }

    if (typeof type !== 'undefined') {
      if (type !== TransactionsType.EXPENSE && type !== TransactionsType.INCOME) {
        return res.status(400).json({ message: 'type must be "EXPENSE" or "INCOME"' });
      }
    }

    const Month = Number(month);
    const Year = Number(year);

    if (Number.isNaN(Month) || Number.isNaN(Year)) {
      return res.status(400).json({ message: 'Query params month and year are required and must be valid numbers' });
    }

    const listTransactions = await TransactionsRepository.findAllByUserId(userId, {
      Month, Year, bankAccountId, type,
    });

    return res.json(listTransactions);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const {
        bankAccountId, categoryId, name, type, date, value,
      } = createTransactionDto.parse(req.body);

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
        value,
      });

      return res.json(transaction);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { transactionId } = req.params;
      const {
        bankAccountId, categoryId, date, name, type, value,
      } = updateTransactionDto.parse(req.body);

      if (!isValidUUID(transactionId)) {
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
        value,
      });

      return res.json(updateTransaction);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { transactionId } = req.params;

    if (!isValidUUID(transactionId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwner = await TransactionsRepository.findFirstTransaction(transactionId, userId);

    if (!isOwner) {
      return res.status(400).json({ message: 'Transaction not found' });
    }

    await TransactionsRepository.remove(transactionId);

    return res.sendStatus(204);
  }
}

export default new TransactionController();
