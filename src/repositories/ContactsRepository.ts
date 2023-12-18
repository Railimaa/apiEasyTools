import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateContactProps {
  userId: string;
  name: string;
  categoryId: string;
  email: string | null;
  phone: string | null;
}

interface UpdateContactProps {
  contactId: string;
  name: string;
  categoryId: string;
  email: string | null;
  phone: string | null;
}

class ContactsRepository {
  async findAllByUserId(userId: string, categoryId?: string, orderBy?: string) {
    const options = {
      where: {
        userId,
        categoryId,
      },
      include: {
        categoryContact: {
          select: { name: true, id: true },
        },
      },
    };

    let contacts = await prisma.contact.findMany(options);

    if (orderBy === 'asc') {
      contacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy === 'desc') {
      contacts = contacts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return contacts;
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

  async findFirstEmail(email: string) {
    return prisma.contact.findUnique({
      where: { email },
      select: { id: true },
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

  async remove(contactId: string) {
    return prisma.contact.delete({
      where: { id: contactId },
    });
  }
}

export default new ContactsRepository();
