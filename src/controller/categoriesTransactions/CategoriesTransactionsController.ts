/* eslint-disable max-len */
import { Request, Response } from 'express';
import { z } from 'zod';

import CategoriesTransactionsRepository from '../../repositories/CategoriesTransactionsRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { createCategoryTransactionDto } from './dto/createCategoryTransactionDto';
import { updateCategoryTransactionDto } from './dto/updateCategoryTransactionDto';

class CategoriesController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const categories = await CategoriesTransactionsRepository.findAllByUserId(userId);

    res.json(categories);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { name, type, icon } = createCategoryTransactionDto.parse(req.body);

      const createCategoryTransaction = await CategoriesTransactionsRepository.create({
        userId,
        name,
        icon,
        type,
      });

      return res.json(createCategoryTransaction);
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
      const { categoryTransactionId } = req.params;
      const { name, icon, type } = updateCategoryTransactionDto.parse(req.body);

      if (!isValidUUID(categoryTransactionId)) {
        return res.status(400).json({ message: 'Invalid uuid' });
      }

      const isOwner = await CategoriesTransactionsRepository.findFirst(categoryTransactionId, userId);

      if (!isOwner) {
        return res.status(400).json({ message: 'Category transaction not found' });
      }

      const updateCategoryTransaction = await CategoriesTransactionsRepository.update({
        categoryTransactionId,
        name,
        icon,
        type,
      });

      return res.json(updateCategoryTransaction);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { categoryTransactionId } = req.params;

    if (!isValidUUID(categoryTransactionId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwner = await CategoriesTransactionsRepository.findFirst(categoryTransactionId, userId);

    if (!isOwner) {
      return res.status(400).json({ message: 'category transaction not found' });
    }

    await CategoriesTransactionsRepository.remove(categoryTransactionId);

    return res.sendStatus(204);
  }
}

export default new CategoriesController();
