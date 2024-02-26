
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const router = useRouter();

  const logout = () => {
    sessionStorage.removeItem("user");
    setLoggedin(false);
    router.push("/login");
  };

  const [loggedin, setLoggedin] = useState(currentUser !== null);

  return (
    <AppContext.Provider value={{ loggedin, setLoggedin, logout }}>
      {children}
    </AppContext.Provider>
  );
};

const UseAppContext = () => useContext(AppContext);

export default UseAppContext;
