import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient;

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



class TransactionsRepository {
    async findAllByUserId(userId: string, filters: { Month: number; Year: number }) {
        return prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(Date.UTC(filters.Year, filters.Month)),
                    lt: new Date(Date.UTC(filters.Year, filters.Month + 1)),
                }
            }
        });
    }

    async findFirstTransaction(transactionId: string, userId: string) {
        return prisma.transaction.findFirst({
            where: { id: transactionId, userId }
        });
    }

    async findFirstBankAccount(bankAccountId: string, userId: string) {
        return prisma.bankAccount.findFirst({
            where: { id: bankAccountId, userId }
        });
    }

    async findFirstCategoryTransaction(categoryTransactionId: string, userId: string) {
        return prisma.categoryTransaction.findFirst({
            where: { id: categoryTransactionId, userId }
        });
    }

    async create({ userId, bankAccountId, categoryId, name, type, date, value }: CreateTransactionProps) {
        return prisma.transaction.create({
            data: {
                userId,
                bankAccountId,
                categoryId,
                name,
                type,
                date,
                value
            }
        });
    }

    async update({ transactionId, categoryId, bankAccountId, name, date, type, value }: UpdateTransactionProps) {
        return prisma.transaction.update({
            where: { id: transactionId },
            data: {
                bankAccountId,
                categoryId,
                name,
                date,
                type,
                value
            }
        });
    }

    async remove(transactionId: string) {
        return prisma.transaction.delete({
            where: { id: transactionId }
        });
    }
}

export default new TransactionsRepository;
