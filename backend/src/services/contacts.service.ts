import { Contact, User } from "../entities";
import AppError from "../errors/AppErrors.error";
import {
  ContactBodyUpdate,
  ContactReturn,
  CreateContact,
} from "../interfaces/contacts.interface";
import { contactRepo, userRepo } from "../repositories";
import {
  contactReturnListSchema,
  contactReturnSchema,
} from "../schemas/contacts.schema";

export const createContactService = async (
  data: CreateContact,
  userId: string
): Promise<ContactReturn> => {
  const user: User | null = await userRepo.findOneBy({ id: userId });

  const contact = await contactRepo.save({ ...data, user: user! });

  return contact;
};

export const readAllContactsService = async (userId: string): Promise<any> => {
  const user: User | null = await userRepo.findOneBy({ id: userId });
  const userToFind = user!;

  const contacts: Contact[] = await contactRepo.find({
    where: { user: userToFind },
    relations: {
      user: true,
    },
  });

  return contactReturnListSchema.parse(contacts);
};

export const updateContactService = async (
  data: ContactBodyUpdate,
  contactId: string
): Promise<ContactReturn> => {
  const contact: Contact | null = await contactRepo.findOneBy({
    id: contactId,
  });

  const contactUpdated: Contact = contactRepo.create({ ...contact, ...data });

  await contactRepo.save(contactUpdated);

  return contactReturnSchema.parse(contactUpdated);
};

export const deleteContactService = async (
  contactId: string
): Promise<void> => {
  const contact: Contact | null = await contactRepo.findOneBy({
    id: contactId,
  });

  if (!contact) {
    throw new AppError("Contact not found");
  }
  await contactRepo.remove(contact);
};
