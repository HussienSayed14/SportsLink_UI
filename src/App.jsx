import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { UserProvider } from "./context/UserContext";
function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
