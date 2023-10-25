import { Request, Response } from 'express';

import CategoriesTasksRepository from '../../repositories/CategoriesTasksRepository';

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
}

export default new CategoriesTaskController();
