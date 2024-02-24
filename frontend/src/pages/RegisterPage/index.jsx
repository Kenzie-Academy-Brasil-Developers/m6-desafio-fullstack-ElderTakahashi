import { RegisterForm } from "../../components/Forms/RegisterForm";
import styles from "./style.module.scss";

export const RegisterPage = () => {
  return (
    <>
      <main className="container ">
        <div className={styles.registerBox}>
          <h1 className="title one">Crie sua conta</h1>
          <p className="headline">Rápido e grátis, vamos nessa</p>
          <RegisterForm />
        </div>
      </main>
    </>
  );
};
