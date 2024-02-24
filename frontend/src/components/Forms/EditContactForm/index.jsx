import { useContext, useState } from "react";
import { Input } from "../Input";
// import { Select } from "../Select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editContactFormSchema } from "./editContactFormSchema";
import { ContactContext } from "../../../providers/ContactContext";

export const EditContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(editContactFormSchema),
  });

  const { currentContact, editContact } = useContext(ContactContext);
  const [loading, setLoading] = useState(false);

  const submit = (formData) => {
    editContact(currentContact.id, formData);
    setLoading(true);
    reset();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {currentContact !== null ? (
        <form onSubmit={handleSubmit(submit)}>
          <Input
            label="Nome"
            type="text"
            placeholder={currentContact.name}
            {...register("name")}
            error={errors.name}
          />

          <Input
            label="Email"
            type="text"
            placeholder={currentContact.email}
            {...register("email")}
            error={errors.email}
          />

          <Input
            label="Telefone"
            type="text"
            placeholder={currentContact.phone}
            {...register("phone")}
            error={errors.phone}
          />

          <Input
            label="Imagem"
            type="text"
            placeholder={currentContact.picture}
            {...register("picture")}
            error={errors.picture}
          />

          <button type="submit" className="submitModal disable">
            {loading ? (
              <span className="spinner sml"></span>
            ) : (
              "Salvar alterações"
            )}
          </button>
        </form>
      ) : null}
    </>
  );
};
