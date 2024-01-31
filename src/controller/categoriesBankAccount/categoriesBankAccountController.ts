import { Request, Response } from 'express';

import CategoriesBankAccountRepository from '../../repositories/CategoriesBankAccountRepository';

class CategoriesBankAccountController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const categories = await CategoriesBankAccountRepository.findAllById(userId);

    return res.json(categories);
  }
}

export default new CategoriesBankAccountController();
