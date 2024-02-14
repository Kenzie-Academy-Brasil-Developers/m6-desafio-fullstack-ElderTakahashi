import { z } from "zod";
import { contactSchema } from "./contacts.schema";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(120),
  email: z.string().email().max(120),
  phone: z.string().max(20),
  picture: z.string().nullable().default(null),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  contacts: z.array(contactSchema),
});

export const userCreateSchema = userSchema.pick({
  name: true,
  email: true,
  phone: true,
  picture: true,
  password: true,
  admin: true,
});

export const userWithoutAdminSchema = userCreateSchema.omit({ admin: true });

export const userUpdateSchema = userWithoutAdminSchema.partial();

export const userReturnSchema = userSchema.omit({
  password: true,
  contacts: true,
});

export const userReturnWithContactsSchema = userSchema.omit({
  password: true,
});

export const userReturnListSchema = userReturnWithContactsSchema.array();

export const userLoginSchema = userSchema.pick({ email: true, password: true });
