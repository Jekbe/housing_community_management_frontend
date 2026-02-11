import {useState} from "react";
import {login} from "../api/AuthApi.ts";
import {useNavigate} from "react-router-dom";
import * as React from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError(null);

        try {
            const response = await login({email, password});
            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.id.toString())
            localStorage.setItem("role", response.role);

            navigate(`/user/${response.id}`);
        } catch {
            setError("Błąd logowania");
        }
    }

    return (
        <div style={{maxWidth: 400, margin: "100px auto"}}>
            <h2>Logowanie</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && <p style={{color: "red"}}>{error}</p>}

                <button type="submit">Zaloguj</button>
            </form>
        </div>
    );
}