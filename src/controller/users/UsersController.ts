import fs from 'fs/promises';
import path from 'node:path';

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
      const { userId } = req;
      const { id } = req.params;
      const imagePath = req.file?.filename;
      const { name, secondName, email } = updateDto.parse(req.body);

      if (!isValidUUID(id)) {
        return res.status(400).json({ message: 'Invalid uuid' });
      }

      const userToUpdate = await UsersRepository.findFirstUser(id);

      if (!userToUpdate) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (userId !== id) {
        return res.status(400).json({ message: 'User not fouuuund' });
      }

      const updateUser = await UsersRepository.update({
        id,
        name,
        secondName,
        email,
        imagePath: imagePath || null,
      });

      return res.json(updateUser);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err });
      }
    }
    return res.status(500).json({ message: 'Error in server' });
  }

  async deleteImage(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { imagePath } = req.params;

      if (!imagePath) {
        return res.status(400).json({ message: 'Invalid imagePath' });
      }

      const isOwner = await UsersRepository.findFirstImage(userId, imagePath);

      if (!isOwner) {
        return res.status(404).json({ message: 'Image not found' });
      }

      const imagePathToDelete = path.join('uploads', imagePath);

      const fileExists = await fs.access(imagePathToDelete).then(() => true).catch(() => false);

      if (!fileExists) {
        return res.status(404).json({ message: 'File not found' });
      }

      await fs.unlink(imagePathToDelete);

      await UsersRepository.updateImage(userId, null);

      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}

export default new UsersController();
