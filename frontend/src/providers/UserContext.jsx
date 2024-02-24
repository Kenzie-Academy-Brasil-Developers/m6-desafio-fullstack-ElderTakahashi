import { createContext, useEffect, useState } from "react";
import { contactListApi } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [contactList, setContactList] = useState();
  const [isVisible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const [updateUserModalVisible, setUpdateUserModalVisible] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@TOKEN"));
    const userId = JSON.parse(localStorage.getItem("@USERID"));

    if (token) {
      getUser(token, userId);
    }
  }, []);

  const getUser = async (token, userId) => {
    try {
      setLoading(true);
      const { data } = await contactListApi.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
      setContactList(data.contacts);
      navigate(pathname);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const userLogin = async (formData, setLoading, reset) => {
    try {
      setLoading(true);
      const { data } = await contactListApi.post("/login", formData);
      localStorage.setItem("@TOKEN", JSON.stringify(data.token));
      localStorage.setItem("@USERID", JSON.stringify(data.userId));

      toast.success("Login realizado com sucesso");

      setTimeout(() => {
        getUser(data.token, data.userId);
      }, 2000);

      reset();
    } catch (error) {
      if (error.response?.data.message === "Invalid credentials") {
        toast.error("O email e a senha não correspondem.");
      }
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (formData, setLoading, reset) => {
    setLoading(true);

    try {
      await contactListApi.post("/users", formData);
      toast.success(
        "Conta criada com sucesso, redirecionando para a página de login"
      );
      reset();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      if (error.response?.data.message === "Email already exists") {
        toast.error("Usuário já cadastrado");
      } else {
        toast.error("Ops! Algo deu errado");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value)
      );

      const { data } = await contactListApi.patch(
        `/users/${id}`,
        filteredData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getUser(token, id);
      setUpdateUserModalVisible(false);
      toast.success("Perfil atualizado com sucesso");
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

  const deleteUser = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("@TOKEN"));

      const { data } = await contactListApi.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUpdateUserModalVisible(false);
      toast.success("Sua conta foi excluida com sucesso");

      setTimeout(() => {
        userLogout();
      }, 2000);
    } catch (error) {
      toast.error("Algo deu errado, tente novamente mais tarde");
    }
  };

  const userLogout = () => {
    setUser(null);
    setVisible(false);
    navigate("/");
    localStorage.removeItem("@TOKEN");
    localStorage.removeItem("@USERID");
    toast.warning("Você foi desconectado");
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        contactList,
        setContactList,
        userLogin,
        userRegister,
        updateUser,
        deleteUser,
        userLogout,
        setVisible,
        isVisible,
        updateUserModalVisible,
        setUpdateUserModalVisible,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
