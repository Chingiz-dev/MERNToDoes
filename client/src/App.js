import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { NavBar } from "./components/NavBar";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;