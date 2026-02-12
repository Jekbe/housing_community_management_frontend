import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBuilding, editBuilding, type BuildingEditRequest } from "../../api/BuildingApi.ts";
import * as React from "react";

type ManagerOption = {
    userId: number;
    name: string;
    surname: string;
};

export default function EditBuildingPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<BuildingEditRequest>({
        country: "",
        city: "",
        postalCode: "",
        street: "",
        buildingNumber: "",
        managerId: 0,
    });
    const [managers, setManagers] = useState<ManagerOption[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Pobranie listy managerów
    useEffect(() => {
        async function fetchManagers() {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8080/users/managers", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error("Nie udało się pobrać managerów");
                const data: ManagerOption[] = await response.json();
                setManagers(data);
            } catch (err) {
                console.error(err);
                alert("Nie udało się pobrać listy managerów");
            }
        }
        fetchManagers();
    }, []);

    // Pobranie danych budynku
    useEffect(() => {
        if (!id) return;

        getBuilding(Number(id))
            .then(data => {
                setForm({
                    country: data.address.country,
                    city: data.address.city,
                    postalCode: data.address.postalCode,
                    street: data.address.street,
                    buildingNumber: data.address.buildingNumber,
                    managerId: data.manager.userId,
                });
            })
            .catch(() => setError("Brak dostępu"));
    }, [id]);

    const handleChange = (field: keyof BuildingEditRequest, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await editBuilding(Number(id), form);
            navigate(`/buildings/${id}`);
        } catch {
            setError("Błąd przy zapisie zmian");
        }
    };

    if (error) return <p className="text-red">{error}</p>;

    return (
        <div className="page">
            <h1>Edytuj budynek</h1>
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
                        {managers.length === 0 && <option>Ładowanie managerów...</option>}
                        {managers.map(m => (
                            <option key={m.userId} value={m.userId}>
                                {m.name} {m.surname}
                            </option>
                        ))}
                    </select>
                </label>

                <button type="submit" className="button">Zapisz zmiany</button>
            </form>
        </div>
    );
}
