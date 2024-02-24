import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "./registerFormSchema";
import { InputPassword } from "../InputPassword";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const [loading, setLoading] = useState(false);
  const { userRegister } = useContext(UserContext);

  const submit = (formData) => {
    userRegister(formData, setLoading, reset);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Nome"
        type="text"
        placeholder="Digite seu nome"
        {...register("name")}
        error={errors.name}
        disabled={loading}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />

      <Input
        label="Telefone"
        type="text"
        placeholder="Digite seu telefone"
        {...register("phone")}
        error={errors.phone}
        disabled={loading}
      />

      <Input
        label="Avatar"
        type="text"
        placeholder="Insira a Url de uma imagem (opcional)"
        {...register("picture")}
        error={errors.phone}
        disabled={loading}
      />

      <InputPassword
        label="Senha"
        placeholder="Digite aqui sua senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
      />

      <InputPassword
        label="Confirmar Senha"
        placeholder="Digite novamente sua senha"
        {...register("confirmPassword")}
        error={errors.confirmPassword}
        disabled={loading}
      />

      <button type="submit" className="signIn colorNegative" disabled={loading}>
        Cadastrar
      </button>
      {loading ? (
        <div className="spinnerBox">
          <p>Cadastrando</p>
          <span className="spinner"></span>
          <p>Aguarde</p>
        </div>
      ) : null}
    </form>
  );
};
