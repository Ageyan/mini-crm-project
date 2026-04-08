import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  }

  return (
    <div className="login-container">
      <h2 className="page-title">Please log in CRM</h2>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
    
  )
}

export default Login;
