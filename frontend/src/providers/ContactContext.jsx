import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { contactListApi } from "../services/api";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const ContactContext = createContext({});

export const ContactProvider = ({ children }) => {
  const [createContactModalVisible, setCreateContactModalVisible] =
    useState(false);
  const { contactList, setContactList } = useContext(UserContext);
  const [currentContact, setCurrentContact] = useState(null);

  const getContacts = async (token) => {
    const userId = JSON.parse(localStorage.getItem("@USERID"));

    const { data } = await contactListApi.get(`/contacts/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setContactList(data);
  };

  const addContact = async (formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value)
      );

      const { data } = await contactListApi.post("/contacts", filteredData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getContacts(token);
      toast.success("Contato adicionada com sucesso");
      setCreateContactModalVisible(false);
    } catch (error) {
      const invalidEmail = error.response.data.message.email[0];

      if (invalidEmail) {
        toast.error("O email precisa ter um formato válido");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
        setCurrentContact(null);
      }
    }
  };

  const editContact = async (id, formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value)
      );

      const { data } = await contactListApi.patch(
        `/contacts/${id}`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getContacts(token);
      toast.success("Contato editado com sucesso");
      setCurrentContact(null);
      return data;
    } catch (error) {
      const invalidEmail = error.response.data.message.email[0];

      if (invalidEmail) {
        toast.error("O email precisa ter um formato válido");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
        setCurrentContact(null);
      }
    }
  };

  const removeContact = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const { data } = await contactListApi.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newContactList = (contactList) =>
        contactList.filter((contact) => contact.id !== id);
      setContactList(newContactList);
      toast.success("Contato excluido com sucesso");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const generatePDF = (userName, contactArray) => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(16);
    doc.text(`Lista de contatos de ${userName}`, 20, y);
    y += 10;

    const headers = ["Nome", "Email", "Telefone"];
    contactArray.sort((a, b) => a.name.localeCompare(b.name));
    const data = contactArray.map((contact) => [
      contact.name,
      contact.email,
      contact.phone,
    ]);
    doc.autoTable({
      head: [headers],
      body: data,
      startY: y,
    });

    doc.save("lista-de-contatos.pdf");
  };

  return (
    <ContactContext.Provider
      value={{
        createContactModalVisible,
        setCreateContactModalVisible,
        addContact,
        removeContact,
        currentContact,
        setCurrentContact,
        editContact,
        generatePDF,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
