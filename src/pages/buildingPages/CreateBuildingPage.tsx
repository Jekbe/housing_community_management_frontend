import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBuilding, type BuildingRequest } from "../../api/BuildingApi.ts";
import * as React from "react";

type ManagerOption = {
    userId: number;
    name: string;
    surname: string;
};

export default function CreateBuildingPage() {
    const [form, setForm] = useState<BuildingRequest>({
        country: "",
        city: "",
        postalCode: "",
        street: "",
        buildingNumber: "",
        managerId: 0,
    });

    const [managers, setManagers] = useState<ManagerOption[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Pobierz listę managerów przy montowaniu komponentu
        fetchManagers();
    }, []);

    async function fetchManagers() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/users/managers", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Nie udało się pobrać managerów");
            const data: ManagerOption[] = await response.json();
            setManagers(data);

            // Ustaw domyślnie pierwszego managera, jeśli lista niepusta
            if (data.length > 0) {
                setForm(prev => ({ ...prev, managerId: data[0].userId }));
            }
        } catch (err) {
            console.error(err);
            alert("Nie udało się pobrać listy managerów");
        }
    }

    const handleChange = (field: keyof BuildingRequest, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await createBuilding(form);
            navigate("/buildings/list");
        } catch {
            setError("Błąd przy tworzeniu budynku");
        }
    };

    return (
        <div className="page">
            <h1>Dodaj nowy budynek</h1>
            <form className="card" onSubmit={handleSubmit}>
                <label>
                    Kraj:
                    <input
                        type="text"
                        value={form.country}
                        onChange={e => handleChange("country", e.target.value)}
                        required
                    />
                </label>
                <label>
                    Miasto:
                    <input
                        type="text"
                        value={form.city}
                        onChange={e => handleChange("city", e.target.value)}
                        required
                    />
                </label>
                <label>
                    Kod pocztowy:
                    <input
                        type="text"
                        value={form.postalCode}
                        onChange={e => handleChange("postalCode", e.target.value)}
                        required
                    />
                </label>
                <label>
                    Ulica:
                    <input
                        type="text"
                        value={form.street}
                        onChange={e => handleChange("street", e.target.value)}
                        required
                    />
                </label>
                <label>
                    Numer budynku:
                    <input
                        type="text"
                        value={form.buildingNumber}
                        onChange={e => handleChange("buildingNumber", e.target.value)}
                        required
                    />
                </label>
                <label>
                    Zarządca:
                    <select
                        value={form.managerId}
                        onChange={e => handleChange("managerId", Number(e.target.value))}
                        required
                    >
                        {managers.map(m => (
                            <option key={m.userId} value={m.userId}>
                                {m.name} {m.surname}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="button">
                    Utwórz budynek
                </button>
                {error && <p className="text-red">{error}</p>}
            </form>
        </div>
    );
}
