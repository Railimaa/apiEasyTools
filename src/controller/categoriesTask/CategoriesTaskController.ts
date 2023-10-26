import { Request, Response } from 'express';

import CategoriesTasksRepository from '../../repositories/CategoriesTasksRepository';
import { isValidUUID } from '../../utils/isValidUUID';

class CategoriesTaskController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const listAll = await CategoriesTasksRepository.findAllByUserId(userId);

    return res.json(listAll);
  }

  async create(req: Request, res: Response) {
    const { userId } = req;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newCategory = await CategoriesTasksRepository.create(userId, name);

    return res.json(newCategory);
  }

  async update(req: Request, res: Response) {
    const { userId } = req;
    const { categoryTaskId } = req.params;
    const { name } = req.body;

    if (!isValidUUID(categoryTaskId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const isOwner = await CategoriesTasksRepository.findFirst(categoryTaskId, userId);

    if (!isOwner) {
      return res.status(404).json({ message: 'Category task not found' });
    }

    const updateCategory = await CategoriesTasksRepository.update(categoryTaskId, name);

    return res.json(updateCategory);
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { categoryTaskId } = req.params;

    if (!isValidUUID(categoryTaskId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwner = await CategoriesTasksRepository.findFirst(categoryTaskId, userId);

    if (!isOwner) {
      return res.status(404).json({ message: 'Category task not found' });
    }

    await CategoriesTasksRepository.remove(categoryTaskId);

    return res.sendStatus(204);
  }
}

export default new CategoriesTaskController();
