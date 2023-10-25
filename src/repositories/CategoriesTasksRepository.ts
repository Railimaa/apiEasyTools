import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriesTasksRepository {
  async findAllByUserId(userId: string) {
    return prisma.categoryTask.findMany({
      where: { userId },
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
}

export default new CategoriesTasksRepository();
