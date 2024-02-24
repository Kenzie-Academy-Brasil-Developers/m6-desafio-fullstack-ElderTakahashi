import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { createContactFormSchema } from "./createContactFormSchema";
import { ContactContext } from "../../../providers/ContactContext";

export const CreateContactForm = () => {
  const { addContact } = useContext(ContactContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createContactFormSchema),
  });

  const [loading, setLoading] = useState(false);

  const submit = (formData) => {
    addContact(formData);
    setLoading(true);
    reset();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        placeholder="nome do contato"
        {...register("name")}
        error={errors.name}
        disabled={loading}
      />

      <Input
        label="Email"
        type="text"
        placeholder="email do contato"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />

      <Input
        label="Telefone"
        type="text"
        placeholder="telefone do contato"
        {...register("phone")}
        error={errors.phone}
        pattern="[0-9]*"
        disabled={loading}
      />

      <Input
        label="Imagem"
        type="text"
        placeholder="Url de uma imagem"
        {...register("picture")}
        error={errors.picture}
        disabled={loading}
      />

      <button type="submit" className="submitModal" disabled={loading}>
        {loading ? <span className="spinner sml"></span> : "Cadastrar Contato"}
      </button>
    </form>
  );
};
