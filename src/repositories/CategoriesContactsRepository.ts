/* eslint-disable max-len */
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

  async create({ userId, name, icon }: { userId: string, name: string, icon: string | null }) {
    return prisma.categoryContact.create({
      data: {
        userId,
        name,
        icon,
      },
    });
  }

  async update({ categoryContactId, name, icon }: { categoryContactId: string, name: string, icon: string | null }) {
    return prisma.categoryContact.update({
      where: { id: categoryContactId },
      data: {
        name,
        icon,
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
