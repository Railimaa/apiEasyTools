import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateContactProps {
  userId: string;
  categoryId: string;
  email?: string;
  name: string;
  phone?: string
}

interface UpdateContactProps {
  contactId: string;
  categoryId: string;
  email?: string;
  name: string;
  phone?: string
}

class ContactsRepository {
  async findAllByUserId(userId: string) {
    return prisma.contact.findMany({
      where: { userId },
      include: {
        categoryContact: {
          select: { name: true, id: true },
        },
      },
    });
  }

  async findFirstContact(contactId: string, userId: string) {
    return prisma.contact.findFirst({
      where: { id: contactId, userId },
    });
  }

  async findFirstCategoryContact(categoryId: string, userId: string) {
    return prisma.categoryContact.findFirst({
      where: { id: categoryId, userId },
    });
  }

  async create({
    userId, categoryId, email, name, phone,
  }: CreateContactProps) {
    return prisma.contact.create({
      data: {
        userId,
        categoryId,
        email,
        name,
        phone,
      },
    });
  }

  async update({
    contactId, categoryId, email, name, phone,
  }: UpdateContactProps) {
    return prisma.contact.update({
      where: { id: contactId },
      data: {
        categoryId,
        email,
        name,
        phone,
      },
    });
  }
}

export default new ContactsRepository();
