import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriesContactsRepository {
  async findAllByUserId(userId: string) {
    return prisma.categoryContact.findMany({
      where: { userId },
    });
  }

  async findContactsByCategory(categoryContactId: string) {
    return prisma.categoryContact.findUnique({
      where: { id: categoryContactId },
      include: {
        contact: true,
      },
    });
  }

  async findFirst(categoryContactId: string, userId: string) {
    return prisma.categoryContact.findFirst({
      where: { id: categoryContactId, userId },
    });
  }

  async create({ userId, name }: { userId: string, name: string }) {
    return prisma.categoryContact.create({
      data: {
        userId,
        name,
      },
    });
  }

  async update({ categoryContactId, name }: { categoryContactId: string, name: string }) {
    return prisma.categoryContact.update({
      where: { id: categoryContactId },
      data: {
        name,
      },
    });
  }

  async remove(categoryContactId: string) {
    return prisma.categoryContact.delete({
      where: { id: categoryContactId },
    });
  }
}

export default new CategoriesContactsRepository();
