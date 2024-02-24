import { useContext, useEffect } from "react";
import { CreateContactForm } from "../../Forms/CreateContactForm";
import { MdClose } from "react-icons/md";
import { ContactContext } from "../../../providers/ContactContext";

export const CreateContactModal = () => {
  const { setCreateContactModalVisible } = useContext(ContactContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCreateContactModalVisible(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="modalOverlay" role="dialog">
      <div className="modal marginTop">
        <div>
          <h3 className="title two">Cadastrar Contato</h3>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setCreateContactModalVisible(false)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <CreateContactForm />
      </div>
    </div>
  );
};
