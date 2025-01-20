import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    user_first_name: "",
    user_last_name: "",
    user_email: "",
    user_mobile: "",
    user_profile: "",
    is_affiliate: "",
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
