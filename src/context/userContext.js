import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, whoami } from "../services/authService";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser() || {});

  useEffect(() => {
    async function fetchUser() {
      const user = await whoami();
      if (user) setUser(user);
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
