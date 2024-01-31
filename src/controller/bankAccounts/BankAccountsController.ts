import { Request, Response } from 'express';
import { z } from 'zod';

import BankAccountsRepository from '../../repositories/BankAccountsRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { createBankAccountDto } from './dto/createBankAccountDto';
import { updateBankAccountDto } from './dto/updateBankAccountDto';

class BankAccountsController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const listBankAccounts = await BankAccountsRepository.findAllByUserId(userId);

    res.json(listBankAccounts);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const {
        name, initialBalance, type, categoryId,
      } = createBankAccountDto.parse(req.body);

      const isOwnerCategory = await BankAccountsRepository.findFirstCategoryBankAccountId(
        categoryId,
        userId,
      );

      if (!isOwnerCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const newBankAccount = await BankAccountsRepository.create({
        userId,
        categoryId,
        name,
        initialBalance,
        type,
      });

      return res.json(newBankAccount);
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
      const { bankAccountId } = req.params;
      const {
        name, initialBalance, type, categoryId,
      } = updateBankAccountDto.parse(req.body);

      if (!isValidUUID(bankAccountId)) {
        return res.status(400).json({ message: 'invalid uuid' });
      }

      const isOwnerBankAccount = await BankAccountsRepository.findFirst(bankAccountId, userId);
      const isOwnerCategory = await BankAccountsRepository.findFirstCategoryBankAccountId(
        categoryId,
        userId,
      );

      if (!isOwnerBankAccount) {
        return res.status(404).json({ message: 'Bank account not found' });
      }

      if (!isOwnerCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const updateBankAccount = await BankAccountsRepository.update({
        bankAccountId,
        categoryId,
        name,
        initialBalance,
        type,
      });

      return res.json(updateBankAccount);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { bankAccountId } = req.params;

      if (!isValidUUID(bankAccountId)) {
        return res.status(400).json({ message: 'invalid uuid' });
      }

      const isOwner = await BankAccountsRepository.findFirst(bankAccountId, userId);

      if (!isOwner) {
        return res.status(400).json({ message: 'bank account not found' });
      }

      await BankAccountsRepository.remove(bankAccountId);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}

export default new BankAccountsController();
