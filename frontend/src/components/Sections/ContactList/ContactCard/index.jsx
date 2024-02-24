import styles from "./style.module.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import { useContext } from "react";
import { ContactContext } from "../../../../providers/ContactContext";
import defaultProfileImg from "../../../../assets/default_profile.svg";

export const ContactCard = ({ id, name, phone, email, picture }) => {
  const { removeContact, setCurrentContact } = useContext(ContactContext);

  const avatar = picture ? picture : defaultProfileImg;
  return (
    <li className={styles.cardBox}>
      <div>
        <img src={avatar} alt="contact img" color="white" />
      </div>
      <div>
        <h2 className="title two">{name}</h2>
        <p className="headline">Telefone: {phone}</p>
        <p className="headline">Email: {email}</p>
      </div>
      <div>
        <div>
          <button
            className="cardButton"
            aria-label="edit"
            title="Editar"
            onClick={() => {
              setCurrentContact({ id, name, email, phone, picture });
            }}
          >
            <MdEdit size={16} color="white" />
          </button>

          <button
            className="cardButton"
            aria-label="delete"
            title="Delete"
            onClick={() => removeContact(id)}
          >
            <MdDelete size={16} color="white" />
          </button>
        </div>
      </div>
    </li>
  );
};
