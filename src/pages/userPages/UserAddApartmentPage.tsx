import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {type BuildingResponse, type BuildingShortResponse, getBuilding, getBuildings} from "../../api/BuildingApi.ts";
import {addApartmentForUser} from "../../api/usersApi.ts";

export default function AssignApartmentPage() {
    const { userId } = useParams();

    const [buildings, setBuildings] = useState<BuildingShortResponse[]>([]);
    const [selectedBuilding, setSelectedBuilding] = useState<BuildingResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getBuildings()
            .then(setBuildings)
            .catch(() => setError("Nie udało się pobrać budynków"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Ładowanie budynków...</p>;
    if (error) return <p className="text-red">{error}</p>;

    if (!selectedBuilding) {
        return (
            <div className="user-page">
                <h1>Wybierz budynek do przypisania mieszkań</h1>
                <ul>
                    {buildings.map(b => (
                        <li key={b.buildingId} style={{ cursor: "pointer", padding: "8px 0" }} onClick={() => {
                            getBuilding(b.buildingId)
                            .then(setSelectedBuilding)
                            .catch(() => alert("Nie udało się pobrać szczegółów budynku"));
                        }}>
                            {b.buildingId} - {b.address.city}, {b.address.street} {b.address.buildingNumber}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div className="user-page">
            <button className="button" onClick={() => setSelectedBuilding(null)} style={{ marginBottom: "16px" }}>
                ← Powrót do listy budynków
            </button>
            <h2>Mieszkania w budynku {selectedBuilding.buildingId}</h2>
            <ul>
                {selectedBuilding.apartments.map(a => (
                    <li key={a.apartmentId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{a.apartmentId} - {a.number}</span>
                        <button className="button" style={{ marginLeft: "10px", padding: "4px 8px" }} onClick={async () => {
                                if (!userId) return;
                                try {
                                    await addApartmentForUser(Number(userId), a.apartmentId);
                                    alert(`Mieszkanie ${a.number} przypisane do użytkownika`);
                                } catch {
                                    alert("Błąd przy przypisywaniu mieszkania");
                                }
                            }}>
                            Przypisz
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
