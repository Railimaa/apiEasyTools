import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UsersRepositoryProps {
  name: string;
  firstName: string;
  email: string;
  password: string;
}

class UsersRepository {
  async create({
    name, firstName, email, password,
  }: UsersRepositoryProps) {
    const user = await prisma.user.create({
      data: {
        name,
        firstName,
        email,
        password,
        categoryTransaction: {
          createMany: {
            data: [
              // Income
              { name: 'Salário', icon: 'salary', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              // Expense
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viagem', icon: 'travel', type: 'EXPENSE' },
              { name: 'Outro', icon: 'other', type: 'EXPENSE' },
            ],
          },
        },
        categoryContacts: {
          createMany: {
            data: [
              { name: 'Instagram' },
              { name: 'Facebook' },
              { name: 'Twitter' },
            ],
          },
        },
        categoryTask: {
          createMany: {
            data: [
              { name: 'Casa' },
              { name: 'Trabalho' },
              { name: 'Pessoal' },
            ],
          },
        },
      },
    });

    return user;
  }

  async findyUnique(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  }

  async findFirst(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        firstName: true,
        email: true,
      },
    });
  }
}

export default new UsersRepository();
