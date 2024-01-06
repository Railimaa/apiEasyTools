import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UsersRepositoryProps {
  name: string;
  secondName: string;
  email: string;
  password: string;
}

interface UserUpdateProps {
  userId: string;
  name: string;
  secondName: string;
  email: string;
  imagePath?: string;
}

class UsersRepository {
  async create({
    name, secondName, email, password,
  }: UsersRepositoryProps) {
    const user = await prisma.user.create({
      data: {
        name,
        secondName,
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
              { name: 'Instagram', icon: 'instagram' },
              { name: 'Facebook', icon: 'facebook' },
              { name: 'Twitter', icon: 'twitter' },
            ],
          },
        },
        categoryTask: {
          createMany: {
            data: [
              { name: 'Casa', icon: 'home' },
              { name: 'Trabalho' },
              { name: 'Pessoal', icon: 'me' },
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
        id: true,
        name: true,
        secondName: true,
        email: true,
        imagePath: true,
      },
    });
  }

  async update({
    userId, name, secondName, email, imagePath,
  }: UserUpdateProps) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name,
        secondName,
        email,
        imagePath,
      },
      select: {
        name: true,
        secondName: true,
        email: true,
        imagePath: true,
      },
    });
  }
}

export default new UsersRepository();
