import { Request, Response } from 'express';

import CategoriesContactsRepository from '../../repositories/CategoriesContactsRepository';
import { isValidUUID } from '../../utils/isValidUUID';

class CategoriesContactController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const listCategories = await CategoriesContactsRepository.findAllByUserId(userId);

    return res.json(listCategories);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const newCategory = await CategoriesContactsRepository.create({
        userId,
        name,
      });

      return res.json(newCategory);
    } catch {
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { categoryContactId } = req.params;
      const { name } = req.body;

      if (!isValidUUID(categoryContactId)) {
        return res.status(400).json({ message: 'invalid uuid' });
      }

      const isOwner = await CategoriesContactsRepository.findFirst(categoryContactId, userId);

      if (!isOwner) {
        return res.status(404).json({ message: 'category contact not found' });
      }

      const updateCategoryContact = await CategoriesContactsRepository.update({
        categoryContactId,
        name,
      });

      return res.json(updateCategoryContact);
    } catch {
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { categoryContactId } = req.params;

    if (!isValidUUID(categoryContactId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwner = await CategoriesContactsRepository.findFirst(categoryContactId, userId);

    if (!isOwner) {
      return res.status(404).json({ message: 'category contact not found' });
    }

    await CategoriesContactsRepository.remove(categoryContactId);

    return res.sendStatus(204);
  }
}

export default new CategoriesContactController();
