import { Request, Response } from 'express';
import { z } from 'zod';

import TasksRepository from '../../repositories/TasksRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { createTaskDto } from './dto/createTask';
import { updateTaskDto } from './dto/updateTask';

class TaskController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;

    const listAll = await TasksRepository.findAllByUserId(userId);

    return res.json(listAll);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const {
        categoryId, name, description, dueDate,
      } = createTaskDto.parse(req.body);

      const isOwner = await TasksRepository.findFirstCategoryTask(categoryId, userId);

      if (!isOwner) {
        return res.status(404).json({ message: 'category task not found' });
      }

      const newTask = await TasksRepository.create({
        userId,
        categoryId,
        name,
        description,
        dueDate,
      });

      return res.json(newTask);
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
      const { taskId } = req.params;
      const {
        categoryId, name, dueDate, description, done,
      } = updateTaskDto.parse(req.body);

      if (!isValidUUID(taskId)) {
        return res.status(400).json({ message: 'Invalid uuid' });
      }

      const isOwnerCategory = await TasksRepository.findFirstCategoryTask(categoryId, userId);
      const isOwnerTask = await TasksRepository.findFirstTask(taskId, userId);

      if (!isOwnerCategory) {
        return res.status(404).json({ message: 'Category task not found' });
      }

      if (!isOwnerTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const updateTask = await TasksRepository.update({
        taskId,
        categoryId,
        name,
        description,
        dueDate,
        done,
      });

      return res.json(updateTask);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async updateDone(req: Request, res: Response) {
    const { userId } = req;
    const { taskId } = req.params;
    const { done } = req.body;

    if (!isValidUUID(taskId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwnerTask = await TasksRepository.findFirstTask(taskId, userId);

    if (!isOwnerTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updateDone = await TasksRepository.updateDone(taskId, done);

    return res.json(updateDone);
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { taskId } = req.params;

    if (!isValidUUID(taskId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwnerTask = await TasksRepository.findFirstTask(taskId, userId);

    if (!isOwnerTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await TasksRepository.remove(taskId);

    return res.sendStatus(204);
  }
}

export default new TaskController();
