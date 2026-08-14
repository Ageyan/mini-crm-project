import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function MainLayout() {
    return (
        <div className="app-container">
            <Header />
            <main className="main-container">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
