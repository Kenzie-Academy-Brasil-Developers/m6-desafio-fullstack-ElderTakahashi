import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormSchema";
import { useContext, useState } from "react";
import { UserContext } from "../../../providers/UserContext";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginFormSchema) });

  const [loading, setLoading] = useState(false);
  const { userLogin } = useContext(UserContext);

  const submit = (formData) => {
    userLogin(formData, setLoading, reset);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Email"
        type="email"
        placeholder="Digite seu email"
        {...register("email")}
        error={errors.email}
        disabled={loading}
      />
      <InputPassword
        label="Senha"
        placeholder="Digite sua senha"
        {...register("password")}
        error={errors.password}
        disabled={loading}
      />
      <button type="submit" className="signIn" disabled={loading}>
        {loading ? <span className="spinner sml"></span> : "Entrar"}
      </button>
    </form>
  );
};
