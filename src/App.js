import UserProvider from "./context/userContext";
import AppStateProvider from "./context/appContext";
import Routes from "./routes/Router";
import "./views/Home/home.scss";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  return (
    <div className="dark">
      <UserProvider>
        <AppStateProvider>
          <Routes />
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
