import styles from "./style.module.scss";
import { ContactList } from "../../components/Sections/ContactList";
import { UserInfo } from "../../components/Sections/UserInfo";

export const DashboardPage = () => {
  return (
    <>
      <main>
        <div className={styles.boxBorder}>
          <UserInfo />
        </div>
        <ContactList />
      </main>
    </>
  );
};
