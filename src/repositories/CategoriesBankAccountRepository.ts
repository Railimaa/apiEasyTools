import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoriesBankAccountRepository {
  async findAllById(userId: string) {
    return prisma.categoryBankAccount.findMany({
      where: { userId },
    });
  }
}

export default new CategoriesBankAccountRepository();
