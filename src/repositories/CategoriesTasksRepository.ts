import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriesTasksRepository {
  async findAllByUserId(userId: string) {
    return prisma.categoryTask.findMany({
      where: { userId },
    });
  }

  async findFirst(categoryTaskId: string, userId: string) {
    return prisma.categoryTask.findFirst({
      where: { id: categoryTaskId, userId },
    });
  }

  async create(userId: string, name: string) {
    return prisma.categoryTask.create({
      data: {
        userId,
        name,
      },
    });
  }

  async update(categoryTaskId: string, name: string) {
    return prisma.categoryTask.update({
      where: { id: categoryTaskId },
      data: {
        name,
      },
    });
  }

  async remove(categoryTaskId: string) {
    return prisma.categoryTask.delete({
      where: { id: categoryTaskId },
    });
  }
}

export default new CategoriesTasksRepository();
