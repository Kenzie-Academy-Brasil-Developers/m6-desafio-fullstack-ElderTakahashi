import { useContext, useEffect } from "react";
import { EditContactForm } from "../../Forms/EditContactForm";
import { MdClose } from "react-icons/md";
import { ContactContext } from "../../../providers/ContactContext";

export const EditContactModal = () => {
  const { setCurrentContact } = useContext(ContactContext);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCurrentContact(null);
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
          <h3 className="title two">Editar contato</h3>
          <button
            className="closeModal"
            aria-label="close"
            title="Fechar"
            onClick={() => setCurrentContact(null)}
          >
            <MdClose size={21} color="gray" />
          </button>
        </div>
        <EditContactForm />
      </div>
    </div>
  );
};
