import { ContactCard } from "./ContactCard";
import styles from "./style.module.scss";
import { MdAddCircle } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { useContext } from "react";
import { UserContext } from "../../../providers/UserContext";
import { ContactContext } from "../../../providers/ContactContext";
import { EditContactModal } from "../../Modal/EditContactModal";
import { CreateContactModal } from "../../Modal/CreateContactModal";
import { useState } from "react";

export const ContactList = () => {
  const { user, contactList } = useContext(UserContext);
  const {
    createContactModalVisible,
    setCreateContactModalVisible,
    currentContact,
    generatePDF,
  } = useContext(ContactContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const orderList = filteredList.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <section className={styles.sectionBox}>
        <div>
          <h2 className="title two">Contatos</h2>
          <div className={styles.buttonsBox}>
            <button
              className="addContact"
              aria-label="Download contact list"
              title="Download contact list"
              onClick={() => generatePDF(user.name, contactList)}
            >
              <FaRegFilePdf />
            </button>
            <button
              className="addContact"
              aria-label="add contact"
              title="Add contact"
              onClick={() => setCreateContactModalVisible(true)}
            >
              <MdAddCircle />
            </button>
          </div>
        </div>
        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Buscar contato..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {contactList.length > 0 ? (
          <ul>
            {orderList.map((contact) => (
              <ContactCard
                key={contact.id}
                id={contact.id}
                name={contact.name}
                phone={contact.phone}
                email={contact.email}
                picture={contact.picture}
              />
            ))}
          </ul>
        ) : (
          <h2 className="title two">Você ainda não adicionou nenhum contato</h2>
        )}
      </section>
      {currentContact !== null ? <EditContactModal /> : null}
      {createContactModalVisible ? <CreateContactModal /> : null}
    </>
  );
};
