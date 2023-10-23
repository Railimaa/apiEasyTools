import { PrismaClient } from '@prisma/client';

import { TransactionsType } from '../controller/transactions/entities/TransactionType';

const prisma = new PrismaClient();

interface CreateTransactionProps {
  userId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  value: number;
}

interface UpdateTransactionProps {
  transactionId: string;
  bankAccountId: string;
  categoryId: string;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  value: number;
}

interface Filters {
  Month: number;
  Year: number;
  bankAccountId?: string;
  type?: TransactionsType;
}

class TransactionsRepository {
  async findAllByUserId(
    userId: string,
    {
      Month, Year, bankAccountId, type,
    }: Filters,
  ) {
    return prisma.transaction.findMany({
      where: {
        userId,
        bankAccountId,
        type,
        date: {
          gte: new Date(Date.UTC(Year, Month)),
          lt: new Date(Date.UTC(Year, Month + 1)),
        },
      },
      include: {
        categoryTransaction: {
          select: {
            id: true,
            name: true,
            icon: true,
          },
        },
      },
    });
  }

  async findFirstTransaction(transactionId: string, userId: string) {
    return prisma.transaction.findFirst({
      where: { id: transactionId, userId },
    });
  }

  async findFirstBankAccount(bankAccountId: string, userId: string) {
    return prisma.bankAccount.findFirst({
      where: { id: bankAccountId, userId },
    });
  }

  async findFirstCategoryTransaction(categoryTransactionId: string, userId: string) {
    return prisma.categoryTransaction.findFirst({
      where: { id: categoryTransactionId, userId },
    });
  }

  async create({
    userId, bankAccountId, categoryId, name, type, date, value,
  }: CreateTransactionProps) {
    return prisma.transaction.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        name,
        type,
        date,
        value,
      },
    });
  }

  async update({
    transactionId, categoryId, bankAccountId, name, date, type, value,
  }: UpdateTransactionProps) {
    return prisma.transaction.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        name,
        date,
        type,
        value,
      },
    });
  }

  async remove(transactionId: string) {
    return prisma.transaction.delete({
      where: { id: transactionId },
    });
  }
}

export default new TransactionsRepository();
