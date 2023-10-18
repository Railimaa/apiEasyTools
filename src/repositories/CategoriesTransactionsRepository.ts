import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface createCategoryTransactionProps {
  userId: string;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE'
}

interface updateCategoryTransactionProps {
  categoryTransactionId: string;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE'
}

class CategoriesTransactionsRepository {
    async findAllByUserId(userId: string) {
        return prisma.categoryTransaction.findMany({
            where: { userId },
        });
    }

    async findFirst(categoriesTransactionsId: string, userId: string) {
        return prisma.categoryTransaction.findFirst({
            where: { id: categoriesTransactionsId, userId }
        });
    }

    async create({ userId, name, icon, type }: createCategoryTransactionProps) {
        return prisma.categoryTransaction.create({
            data: {
                userId,
                name,
                icon,
                type
            }
        });
    }

    async update({ categoryTransactionId, name, icon, type }: updateCategoryTransactionProps) {
        return prisma.categoryTransaction.update({
            where: { id: categoryTransactionId },
            data: {
                name,
                icon,
                type
            }
        });
    }

    async remove(categoriesTransactionsId: string) {
        return prisma.categoryTransaction.delete({
            where: { id: categoriesTransactionsId }
        });
    }

}


export default new CategoriesTransactionsRepository;
