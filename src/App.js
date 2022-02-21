import UserProvider from "./context/userContext";
import Routes from "./routes/Router";

const App = () => {
  return (
    <div className="dark">
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
};

export default App;
