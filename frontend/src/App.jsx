import { useContext } from "react";
import { DefaultTemplate } from "./components/DefaultTemplate";
import { RoutesMain } from "./routes";
import "./styles/index.scss";
import { UserContext } from "./providers/UserContext";

const App = () => {
  const { loading } = useContext(UserContext);

  return (
    <>
      {loading ? (
        <div className="spinnerBox">
          <span className="spinner"></span>
        </div>
      ) : (
        <DefaultTemplate>
          <RoutesMain />
        </DefaultTemplate>
      )}
    </>
  );
};

export default App;
