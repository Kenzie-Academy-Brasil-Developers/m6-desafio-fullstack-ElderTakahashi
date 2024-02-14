import { z } from "zod";
import { Repository } from "typeorm";
import { Contact } from "../entities";
import {
  contactCreateSchema,
  contactReturnSchema,
} from "../schemas/contacts.schema";

export type CreateContact = z.infer<typeof contactCreateSchema>;

export type ContactReturn = z.infer<typeof contactReturnSchema>;

export type ContactReadReturn = ContactReturn[];

export type ContactBodyUpdate = CreateContact;

export type ContactRepo = Repository<Contact>;
