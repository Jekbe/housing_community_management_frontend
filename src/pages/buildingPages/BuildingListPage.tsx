import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBuildings, type BuildingShortResponse } from "../../api/BuildingApi.ts";

export default function BuildingsListPage() {
    const [buildings, setBuildings] = useState<BuildingShortResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        getBuildings()
            .then(setBuildings)
            .catch(() => setError("Nie udało się pobrać budynków"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="page">
            <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Budynek</h1>
                {localStorage.getItem("role") === "HOUSING_MANAGER" && (
                    <button className="button" onClick={() => navigate("/buildings/create")}>Dodaj budynek</button>
                )}
            </header>

            {loading && <p>Ładowanie...</p>}
            {error && <p className="text-red">{error}</p>}

            {!loading && !error && (
                <div className="card">
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Miasto</th>
                            <th>Ulica</th>
                            <th>Numer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {buildings.map(b => (
                            <tr
                                key={b.buildingID}
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/buildings/${b.buildingID}`)}
                            >
                                <td>{b.buildingID}</td>
                                <td>{b.address.city}</td>
                                <td>{b.address.street}</td>
                                <td>{b.address.buildingNumber}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

    );
}
