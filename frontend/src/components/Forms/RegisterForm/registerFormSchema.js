import { z } from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, "Insira o seu nome"),
    email: z
      .string()
      .min(1, "Insira o seu e-mail")
      .email("Forneça um e-mail válido"),
    password: z
      .string()
      .min(1, "Digite uma senha válida")
      .min(8, "São necessários pelo menos oito caracteres")
      .regex(/[A-Z]+/, "É necessário conter pelo menos uma letra maiúscula")
      .regex(/[a-z]+/, "É necessário conter pelo menos uma letra minúscula")
      .regex(/[0-9]+/, "É necessário pelo menos um número")
      .regex(
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/]/,
        "É necessário pelo menos um caracter especial."
      ),
    confirmPassword: z.string().min(1, "Confirme a sua senha"),
    phone: z
      .string()
      .min(1, "Informe seu telefone")
      .refine((value) => {
        const phoneRegex = /^[0-9]*$/;
        return phoneRegex.test(value);
      }, "O telefone deve conter apenas números"),
    picture: z.string().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });
