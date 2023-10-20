import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

interface CreateBankAcountProps {
  userId: string,
  name: string,
  initialBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
  color: string
}


interface UpdateBankAcountProps {
  bankAccountId: string,
  name: string,
  initialBalance: number,
  type: 'CHECKING' | 'INVESTMENT' | 'CASH',
  color: string
}

class BankAccountsRepository {
    async findAllByUserId(userId: string) {
        const bankAccounts = await prisma.bankAccount.findMany({
            where: { userId },
            include: {
                transactions: {
                    select: {
                        value: true,
                        type: true
                    }
                }
            }
        });

        return bankAccounts.map(({ transactions, ...bankAccount }) => {
            const totalTransactions = transactions.reduce((acc, transaction) => (
                acc + (transaction.type === 'INCOME' ? transaction.value : -transaction.value)
            ), 0);

            const currentBalance = bankAccount.initialBalance + totalTransactions;

            return {
                ...bankAccount,
                currentBalance: currentBalance
            };
        });
    }

    async findFirst(bankAccountId: string, userId: string) {
        return prisma.bankAccount.findFirst({
            where: { id: bankAccountId, userId },
        });
    }

    async create({ userId, name, initialBalance, type, color }: CreateBankAcountProps) {
        return prisma.bankAccount.create({
            data: {
                userId,
                name,
                initialBalance,
                type,
                color,
            }
        });
    }


    async update({ bankAccountId, name, initialBalance, type, color }: UpdateBankAcountProps) {
        return prisma.bankAccount.update({
            where: { id: bankAccountId },
            data: {
                name,
                initialBalance,
                type,
                color
            }
        });
    }

    async remove(bankAccountId: string) {
        return prisma.bankAccount.delete({
            where: { id: bankAccountId }
        });
    }

}

export default new BankAccountsRepository;
