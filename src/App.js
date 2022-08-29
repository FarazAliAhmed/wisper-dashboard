import UserProvider from "./context/userContext";
import AppStateProvider from "./context/appContext";
import Routes from "./routes/Router";
import "./views/Home/home.scss"

const App = () => {
  return (
    <div className="dark">
      <UserProvider>
        <AppStateProvider>
          <Routes />
        </AppStateProvider>
      </UserProvider>
    </div>
  );
};

export default App;
