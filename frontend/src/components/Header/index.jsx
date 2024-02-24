import { Link, useLocation } from "react-router-dom";
import { LogoutModal } from "../Modal/LogoutModal";
import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";

export const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { setVisible, isVisible, user } = useContext(UserContext);

  const renderButton = () => {
    if (currentPath === "/dashboard") {
      return (
        <button
          className="logout"
          title="Logout"
          aria-label="logout"
          onClick={() => setVisible(true)}
        >
          Sair
        </button>
      );
    } else if (currentPath !== "/") {
      return (
        <button className="transparent" title="Voltar" aria-label="back">
          <Link to={user ? "/dashboard" : "/"} className="link back">
            Voltar
          </Link>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <header>
      <div
        className={`container high ${
          currentPath !== "/" ? "spaceBetween" : ""
        } ${currentPath !== "/" && currentPath !== "/register" ? "wider" : ""}
        ${currentPath === "/register" ? "marginTop" : ""}
        `}
      >
        <h1
          className={`logoSize ${currentPath === "/register" ? "reg" : ""} 
          ${currentPath === "/dashboard" ? "dash" : ""}`}
        >
          Contact List
        </h1>
        {renderButton()}
      </div>

      {isVisible ? <LogoutModal /> : null}
    </header>
  );
};
