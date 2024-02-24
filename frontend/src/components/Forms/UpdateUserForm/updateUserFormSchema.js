import { z } from "zod";
export const updateUserFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine((value) => {
      const phoneRegex = /^[0-9]*$/;
      return phoneRegex.test(value);
    }, "O telefone deve conter apenas números"),
  picture: z.string().optional(),
  password: z.string().optional(),
});
