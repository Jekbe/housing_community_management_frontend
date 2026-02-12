import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, editUser, type UserEditRequest } from "../../api/usersApi";
import * as React from "react";

export default function EditUserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedRole = localStorage.getItem("role");
    const isHousingManager = loggedRole === "HOUSING_MANAGER";
    const [form, setForm] = useState<UserEditRequest>({
        name: "",
        surname: "",
        pesel: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        getUserProfile(Number(id))
            .then(data => {
                setForm({
                    name: data.name,
                    surname: data.surname,
                    pesel: data.pesel,
                    email: data.email,
                    password: "",
                });
            })
            .catch(() => setError("Brak dostępu"));
    }, [id]);

    const handleChange = (field: keyof UserEditRequest, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await editUser(Number(id), form);
            navigate(`/users/${id}`);
        } catch {
            setError("Błąd podczas zapisu");
        }
    };

    if (error) return <p className="text-red">{error}</p>;

    return (
        <div className="user-page">
            <header className="user-header">
                <h1>Edytuj użytkownika</h1>
            </header>

            <form className="card" onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Imię</label>
                    <input
                        type="text"
                        value={form.name}
                        disabled={!isHousingManager}
                        onChange={e => handleChange("name", e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Nazwisko</label>
                    <input
                        type="text"
                        value={form.surname}
                        disabled={!isHousingManager}
                        onChange={e => handleChange("surname", e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>PESEL</label>
                    <input
                        type="text"
                        value={form.pesel}
                        disabled={!isHousingManager}
                        onChange={e => handleChange("pesel", e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Hasło</label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={e => handleChange("password", e.target.value)}
                        placeholder="Pozostaw puste jeśli bez zmian"
                    />
                </div>

                <button type="submit" className="button">
                    Zapisz zmiany
                </button>
            </form>
        </div>
    );
}
