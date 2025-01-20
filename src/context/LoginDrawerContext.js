import { createContext, useState } from "react";

const LoginDrawerContext = createContext();

const LoginDrawerProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <LoginDrawerContext.Provider
      value={{
        showLogin,
        setShowLogin,
      }}
    >
      {children}
    </LoginDrawerContext.Provider>
  );
};

export { LoginDrawerContext, LoginDrawerProvider };
