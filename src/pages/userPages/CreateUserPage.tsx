import {useState} from "react";
import {createUser, type Role, roleLabel, type UserRequest} from "../../api/usersApi.ts";
import {useNavigate} from "react-router-dom";
import * as React from "react";

export default function CreateUserPage() {
    const [form, setForm] = useState<UserRequest>({
        name: "",
        email: "",
        password: "",
        pesel: "",
        role: 'RESIDENT',
        surname: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (field: keyof UserRequest, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await createUser(form);
            setSuccess(true);
            setTimeout(() => navigate("/users/list"), 1000);
        } catch {
            setError("Coś poszło nie tak");
        }
    };

    return (
        <div className="user-page">
            <header className="user-header">
                <h1>Dodaj nowego użytkownika</h1>
            </header>

            <form className="card" onSubmit={handleSubmit}>
                <label>
                    Imię:
                    <input type="text" value={form.name} onChange={e => handleChange("name", e.target.value)} required />
                </label>

                <label>
                    Nazwisko:
                    <input type="text" value={form.surname} onChange={e => handleChange("surname", e.target.value)} required />
                </label>

                <label>
                    PESEL:
                    <input type="text" value={form.pesel} onChange={e => handleChange("pesel", e.target.value)} required />
                </label>

                <label>
                    Email:
                    <input type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} required />
                </label>

                <label>
                    Hasło:
                    <input type="password" value={form.password} onChange={e => handleChange("password", e.target.value)} required />
                </label>

                <label>
                    Rola:
                    <select value={form.role} onChange={e => handleChange("role", e.target.value as Role)}>
                        {(["RESIDENT", "BUILDING_MANAGER", "HOUSING_MANAGER"] as Role[]).map(r => (
                            <option key={r} value={r}>{roleLabel[r]}</option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="button">Utwórz użytkownika</button>

                {error && <p className="text-red">{error}</p>}
                {success && <p className="text-green">Użytkownik został utworzony!</p>}
            </form>
        </div>
    );
}
