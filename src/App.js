import UserProvider from "./context/userContext";
import AppStateProvider from "./context/appContext";
import Routes from "./routes/Router";
import "./views/Home/home.scss";
import { Toaster, toast } from "react-hot-toast";
import React, { useState } from "react";
export const SettingsNav = React.createContext();

const App = () => {
  const [navState, setNavState] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const setNavStateFunc = (state) => {
    setNavState(state);
  };

  return (
    <div className="dark">
      <UserProvider>
        <AppStateProvider>
          <SettingsNav.Provider
            value={{
              setNavStateFunc,
              navState,
              verificationMessage,
              setVerificationMessage,
            }}
          >
            <Routes />
          </SettingsNav.Provider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
                fontSize: "15px",
                zIndex: 99999999999999999999999999999,
              },
            }}
          />
        </AppStateProvider>
      </UserProvider>
    </div>
  );
};

export default App;
