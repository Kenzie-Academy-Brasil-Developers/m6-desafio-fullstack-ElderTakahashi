import { useContext, useState } from "react";
import { Input } from "../Input";
import { InputPassword } from "../InputPassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserFormSchema } from "./updateUserFormSchema";
import { UserContext } from "../../../providers/UserContext";
import styles from "./style.module.scss";

export const UpdateUserForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserFormSchema),
  });

  const { user, deleteUser, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const submit = (formData) => {
    updateUser(user.id, formData);
    setLoading(true);
    reset();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {user !== null ? (
        <form onSubmit={handleSubmit(submit)}>
          <div className={styles.grid}>
            <Input
              label="Nome"
              type="text"
              placeholder={user.name}
              {...register("name")}
              error={errors.name}
            />

            <Input
              label="Email"
              type="text"
              placeholder={user.email}
              {...register("email")}
              error={errors.email}
            />

            <Input
              label="Telefone"
              type="text"
              placeholder={user.phone}
              {...register("phone")}
              error={errors.phone}
            />

            <Input
              label="Imagem"
              type="text"
              placeholder={user.picture}
              {...register("picture")}
              error={errors.picture}
            />

            <InputPassword
              label="Alterar senha"
              placeholder="Digite aqui sua nova senha"
              {...register("password")}
              error={errors.password}
              disabled={loading}
            />
          </div>
          <button type="submit" className="submitModal disable">
            {loading ? (
              <span className="spinner sml"></span>
            ) : (
              "Salvar alterações"
            )}
          </button>

          <div className={styles.deleteBox}>
            <button
              className="delAccount"
              onClick={(event) => {
                event.preventDefault();
                setShowConfirm(true);
              }}
            >
              Excluir conta
            </button>
            {showConfirm ? (
              <div>
                <h2 className="title two">
                  Tem certeza que deseja excluir sua conta?
                </h2>
                <div>
                  <button
                    className="delAccount options"
                    onClick={() => deleteUser(user.id)}
                  >
                    Sim
                  </button>
                  <button
                    className="delAccount options"
                    onClick={() => setShowConfirm(false)}
                  >
                    Não
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      ) : null}
    </>
  );
};
