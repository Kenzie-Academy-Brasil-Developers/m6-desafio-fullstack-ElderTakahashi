import { z } from "zod";

export const contactSchema = z.object({
  id: z.string(),
  name: z.string().max(120),
  email: z.string().email().max(120).nullable().default(null),
  phone: z.string().max(20).nullable().default(null),
  picture: z.string().nullable().default(null),
  createdAt: z.string(),
});

export const contactCreateSchema = contactSchema.pick({
  name: true,
  email: true,
  phone: true,
  picture: true,
});

export const contactUpdateSchema = contactCreateSchema.partial();

export const contactReturnSchema = contactSchema;

export const contactReturnListSchema = contactReturnSchema.array();
