import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  readAllContactsService,
  updateContactService,
} from "../services/contacts.service";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decoded;

  await createContactService(req.body, sub);

  return res.status(201).json({ message: "Contact created" });
};

export const readAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const contacts = await readAllContactsService(userId);
  return res.status(200).json(contacts);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contactId } = req.params;
  const updatedContact = await updateContactService(req.body, contactId);
  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contactId } = req.params;
  await deleteContactService(contactId);
  return res.status(204).json();
};
