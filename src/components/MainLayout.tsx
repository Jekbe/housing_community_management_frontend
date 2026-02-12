import {Link, Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="app-layout">
            <aside className="sidebar">
                <h2>Panel</h2>
                <Link to={`/users/${localStorage.getItem('userId')}`}>Mój profil</Link>
                {localStorage.getItem('role') !== 'RESIDENT' && (
                    <Link to='/users/list'>lista użytkowników</Link>
                )}
                {localStorage.getItem('role') === 'HOUSING_MANAGER' && (
                    <Link to='/buildings/list'>Lista budynków</Link>
                )}
                <Link to="/files">Pliki</Link>
                <Link to="/messages">Wiadomości</Link>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
