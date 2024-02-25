import { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { UserContext } from "../../../providers/UserContext";
import { UpdateUserForm } from "../../Forms/UpdateUserForm";
export const UpdateUserModal = () => {
  const { setUpdateUserModalVisible } = useContext(UserContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setUpdateUserModalVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modalOverlay" role="dialog">
      <div className="modal marginTop widder">
        <div>
          <h3 className="title two">Editar perfil</h3>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setUpdateUserModalVisible(false)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <UpdateUserForm />
      </div>
    </div>
  );
};
