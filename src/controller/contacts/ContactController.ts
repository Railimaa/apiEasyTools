import { Request, Response } from 'express';
import { z } from 'zod';

import ContactsRepository from '../../repositories/ContactsRepository';
import { isValidUUID } from '../../utils/isValidUUID';

import { createContactDto } from './dto/createContact';
import { updateContactDto } from './dto/updateContact';

class ContactController {
  async findAll(req: Request, res: Response) {
    const { userId } = req;
    const { categoryId, orderBy } = req.query;

    if (typeof categoryId !== 'string' && typeof categoryId !== 'undefined') {
      return res.status(400).json({ message: 'categoryId tem que ter um valor' });
    }

    if (typeof orderBy !== 'string' && typeof orderBy !== 'undefined') {
      return res.status(400).json({ message: 'orderBy tem que ter um valor' });
    }

    const listAll = await ContactsRepository.findAllByUserId(userId, categoryId, orderBy);

    return res.json(listAll);
  }

  async create(req: Request, res: Response) {
    try {
      const { userId } = req;
      const {
        categoryId, email, name, phone,
      } = createContactDto.parse(req.body);

      const isOwner = await ContactsRepository.findFirstCategoryContact(categoryId, userId);

      if (!isOwner) {
        return res.status(404).json({ message: 'Category contact not found' });
      }

      if (email) {
        const emailInUse = await ContactsRepository.findFirstEmail(email);
        if (emailInUse) {
          return res.status(400).json({ message: 'This e-mail already in use' });
        }
      }

      const newContact = await ContactsRepository.create({
        userId,
        categoryId,
        email,
        name,
        phone,
      });

      return res.json(newContact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { contactId } = req.params;
      const {
        categoryId, email, name, phone,
      } = updateContactDto.parse(req.body);

      if (!isValidUUID(contactId)) {
        return res.status(400).json({ message: 'Invalid uuid' });
      }

      const isOwnerCategory = await ContactsRepository.findFirstCategoryContact(categoryId, userId);
      const isOwnerContact = await ContactsRepository.findFirstContact(contactId, userId);

      if (!isOwnerCategory) {
        return res.status(404).json({ message: 'Category contact not found' });
      }

      if (!isOwnerContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      if (email) {
        const emailInUse = await ContactsRepository.findFirstEmail(email);
        if (emailInUse && emailInUse.id !== contactId) {
          return res.status(400).json({ message: 'This e-mail already in use' });
        }
      }

      const updateContact = await ContactsRepository.update({
        contactId,
        categoryId,
        email,
        name,
        phone,
      });

      return res.json(updateContact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json(err);
      }
      return res.status(500).json({ message: 'Error in server' });
    }
  }

  async remove(req: Request, res: Response) {
    const { userId } = req;
    const { contactId } = req.params;

    if (!isValidUUID(contactId)) {
      return res.status(400).json({ message: 'Invalid uuid' });
    }

    const isOwnerContact = await ContactsRepository.findFirstContact(contactId, userId);

    if (!isOwnerContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await ContactsRepository.remove(contactId);

    return res.sendStatus(204);
  }
}

export default new ContactController();
