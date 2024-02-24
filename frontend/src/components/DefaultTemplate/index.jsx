import { Header } from "../Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const DefaultTemplate = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <ToastContainer position="top-right" autoClose={2 * 1000} />
    </>
  );
};
