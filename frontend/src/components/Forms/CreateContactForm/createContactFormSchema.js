import { z } from "zod";

export const createContactFormSchema = z.object({
  name: z.string().min(1, "Insira o nome do contato"),
  email: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((value) => {
      const phoneRegex = /^[0-9]*$/;
      return phoneRegex.test(value);
    }, "O telefone deve conter apenas números"),
  picture: z.string().optional(),
});
