import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MainLayout() {
    const { logout } = useAuth();

  return (
    <div>
        <header>
            <h1 className="crm-title">MINI CRM</h1>
            <button className="crm-button-logout" onClick={logout}>Logout</button>
            <nav className="crm-nav-menu">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink> {" "}
                <NavLink className="nav-link" to="/clients">Clients</NavLink>{" "}
                <NavLink className="nav-link" to="/tasks">Tasks</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default MainLayout;