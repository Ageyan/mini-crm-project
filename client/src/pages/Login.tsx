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
    <div className="login-page">
      <div className="login-page__container">
        <h2 className="login-page__title">Please log in CRM</h2>
        <button className="login-page__button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Login;
