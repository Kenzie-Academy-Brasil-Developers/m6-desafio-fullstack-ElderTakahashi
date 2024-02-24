import { MdClose } from "react-icons/md";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../providers/UserContext";

export const LogoutModal = () => {
  const { userLogout, setVisible } = useContext(UserContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modalOverlay" role="dialog">
      <div className="modal logout">
        <div>
          <h2 className="title two">Logout</h2>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setVisible(false)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <h1 className="title one">Tem certeza que quer se desconectar?</h1>
        <div>
          <button className="logoutModalButton" onClick={userLogout}>
            Sim
          </button>
          <button
            className="logoutModalButton"
            onClick={() => setVisible(false)}
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};
