import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {getUsersList, roleLabel, type UserShortResponse} from "../../api/usersApi.ts";

export default function UsersListPage() {
    const [users, setUsers] = useState<UserShortResponse[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getUsersList()
            .then(setUsers)
            .catch((err: { message: never; }) => setError(err.message || "Błąd przy pobieraniu listy"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="users-list-page">
            <header className="user-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Użytkownicy</h1>
                <button className="button" onClick={() => navigate("/users/create")}>
                    Dodaj nowego użytkownika
                </button>
            </header>

            {loading && <p>Ładowanie...</p>}
            {error && <p className="text-red">{error}</p>}

            {!loading && !error && (
                <div className="card">
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Email</th>
                            <th>Rola</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.userId} style={{ cursor: "pointer" }} onClick={() => navigate(`/users/${user.userId}`)}>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>{roleLabel[user.role]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
