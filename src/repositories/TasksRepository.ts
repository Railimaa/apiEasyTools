import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateTaskProps {
  userId: string
  categoryId: string;
  name: string;
  description?: string;
  dueDate: string;
}

interface UpdateTaskProps {
  taskId: string
  categoryId: string;
  name: string;
  description?: string;
  dueDate: string;
  done: boolean;
}

class TasksRepository {
  async findAllByUserId(userId: string) {
    return prisma.task.findMany({
      where: { userId },
    });
  }

  async findFirstCategoryTask(categoryId: string, userId: string) {
    return prisma.categoryTask.findFirst({
      where: { id: categoryId, userId },
    });
  }

  async findFirstTask(taskId: string, userId: string) {
    return prisma.task.findFirst({
      where: { id: taskId, userId },
    });
  }

  async create({
    userId,
    categoryId,
    name,
    description,
    dueDate,
  }: CreateTaskProps) {
    return prisma.task.create({
      data: {
        userId,
        categoryId,
        name,
        description,
        dueDate,
      },
    });
  }

  async update({
    taskId, categoryId, name, description, dueDate, done,
  }: UpdateTaskProps) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        categoryId,
        name,
        description,
        dueDate,
        done,
      },
    });
  }

  async updateDone(taskId: string, done: boolean) {
    return prisma.task.update({
      where: { id: taskId },
      data: {
        done,
      },
      select: {
        done: true,
      },
    });
  }

  async remove(taskId: string) {
    return prisma.task.delete({
      where: { id: taskId },
    });
  }
}

export default new TasksRepository();
