import { Link } from "react-router-dom";
import { LoginForm } from "../../components/Forms/LoginForm";
import styles from "./style.module.scss";

export const LoginPage = () => {
  return (
    <>
      <main className="container">
        <div className={styles.loginBox}>
          <h1 className="title one">Login</h1>
          <LoginForm />
          <div>
            <p className="headline bold">Ainda não possui uma conta?</p>
            <Link to="/register" className="link signUp">
              Cadastre-se
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
