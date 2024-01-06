import { Request, Response } from 'express';
import { z } from 'zod';

import UsersRepository from '../../repositories/UsersRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { updateDto } from './dto/updateDto';

class UsersController {
  async me(req: Request, res: Response) {
    const { userId } = req;

    const user = await UsersRepository.getUserById(userId);

    res.json(user);
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const imagePath = req.file?.filename;
      const { name, secondName, email } = updateDto.parse(req.body);

      if (!isValidUUID(userId)) {
        return res.status(400).json({ message: 'Invalid uuid' });
      }

      const updateUser = await UsersRepository.update({
        userId,
        name,
        secondName,
        email,
        imagePath,
      });

      return res.json(updateUser);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err });
      }
    }
    return res.status(500).json({ message: 'Error in server' });
  }
}

export default new UsersController();
