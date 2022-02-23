import UserProvider from "./context/userContext";
import AppStateProvider from "./context/appContext";
import Routes from "./routes/Router";

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
