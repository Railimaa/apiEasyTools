import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateBankAcountProps {
  userId: string,
  categoryId: string
  name: string,
  initialBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

interface UpdateBankAcountProps {
  bankAccountId: string,
  categoryId: string
  name: string,
  initialBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
}

class BankAccountsRepository {
  async findAllByUserId(userId: string) {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
        categoryBankAccount: {
          select: {
            id: true,
            color: true,
            icon: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransaction = transactions.reduce((total, transaction) => (
        total + (transaction.type === 'INCOME' ? transaction.value : -transaction.value)
      ), 0);

      const currentBalance = bankAccount.initialBalance + totalTransaction;

      return {
        ...bankAccount,
        currentBalance,
      };
    });
  }

  async findFirst(bankAccountId: string, userId: string) {
    return prisma.bankAccount.findFirst({
      where: { id: bankAccountId, userId },
    });
  }

  async create({
    userId, name, initialBalance, type, categoryId,
  }: CreateBankAcountProps) {
    return prisma.bankAccount.create({
      data: {
        userId,
        categoryId,
        name,
        initialBalance,
        type,
      },
    });
  }

  async update({
    bankAccountId, name, initialBalance, type, categoryId,
  }: UpdateBankAcountProps) {
    return prisma.bankAccount.update({
      where: { id: bankAccountId },
      data: {
        name,
        initialBalance,
        type,
        categoryId,
      },
    });
  }

  async remove(bankAccountId: string) {
    return prisma.bankAccount.delete({
      where: { id: bankAccountId },
    });
  }

  async findFirstCategoryBankAccountId(categoryBankAccountId: string, userId: string) {
    return prisma.categoryBankAccount.findFirst({
      where: { id: categoryBankAccountId, userId },
    });
  }
}

export default new BankAccountsRepository();
