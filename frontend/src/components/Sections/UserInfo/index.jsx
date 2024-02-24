import { useContext } from "react";
import styles from "./style.module.scss";
import { UserContext } from "../../../providers/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { UpdateUserModal } from "../../Modal/UpdateUserModal";
import defaultProfileImg from "../../../assets/default_profile.svg";

export const UserInfo = () => {
  const {
    user,
    contactList,
    updateUserModalVisible,
    setUpdateUserModalVisible,
  } = useContext(UserContext);

  const avatar = user.picture ? user.picture : defaultProfileImg;
  return (
    <>
      <section className={styles.sectionBox}>
        <div>
          <img src={avatar} alt="" />
          <h1 className="title one">
            Olá, {user?.name}{" "}
            <button
              className="cardButton"
              aria-label="edit"
              title="Editar"
              onClick={() => setUpdateUserModalVisible(true)}
            >
              <MdOutlineEdit color="white" size={12} />
            </button>
          </h1>
        </div>
        <div>
          <p className="headline bold">
            Você possui {contactList.length} contato(s) cadastrado(s)
          </p>
        </div>
      </section>
      {updateUserModalVisible ? <UpdateUserModal /> : null}
    </>
  );
};
