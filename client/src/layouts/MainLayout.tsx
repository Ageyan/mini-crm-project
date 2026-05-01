import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
    const { logout } = useAuth();

  return (
    <div>
        <header className="header">
            <h1 className="header__title">MINI CRM</h1>
            <button className="header__button-logout" onClick={logout}>Logout</button>
            <nav className="header__nav-menu">
                <NavLink className="header__nav-link" to="/dashboard">Dashboard</NavLink> {" "}
                <NavLink className="header__nav-link" to="/clients">Clients</NavLink>{" "}
                <NavLink className="header__nav-link" to="/tasks">Tasks</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout;