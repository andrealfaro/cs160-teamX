import './App.css';
import { React } from "react"; 
import AppRoutes from "./routes/AppRoutes" 
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
)}

export default App;
