import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBuilding, deleteBuilding, type BuildingResponse } from "../../api/BuildingApi.ts";

export default function BuildingPage() {
    const { id } = useParams();
    const [data, setData] = useState<BuildingResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        getBuilding(Number(id))
            .then(setData)
            .catch(() => setError("Brak dostępu"));
    }, [id]);

    if (error) return <p className="text-red">{error}</p>;
    if (!data) return <p>Ładowanie...</p>;

    return (
        <div className="page">
            <header className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1>Budynek {data.buildingId}</h1>
                    <p>{data.address.city}, {data.address.street} {data.address.buildingNumber}</p>
                </div>

                {localStorage.getItem("role") === "HOUSING_MANAGER" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <button className="button" onClick={() => navigate(`/buildings/edit/${data.buildingId}`)}>Edytuj budynek</button>
                        <button className="button" onClick={async () => {
                            try {
                                await deleteBuilding(data.buildingId);
                                navigate("/buildings/list");
                            } catch {
                                alert("Nie udało się usunąć budynku");
                            }
                        }}>Usuń budynek</button>
                        <button className="button" onClick={() => navigate(`/apartments/create?buildingId=${data.buildingId}`)}>Dodaj mieszkanie</button>
                        <button className="button" onClick={() => navigate(`/events/create?buildingId=${data.buildingId}`)}>Dodaj wydarzenie</button>
                    </div>
                )}
            </header>

            <section className="building-sections">
                {/* Mieszkania */}
                <h2>Mieszkania</h2>
                {!data.apartments || data.apartments.length === 0 ? (
                    <p>Brak mieszkań w tym budynku</p>
                ) : (
                    <div className="card">
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Numer</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.apartments.map(a => (
                                <tr key={a.apartmentId} style={{ cursor: "pointer" }} onClick={() => navigate(`/apartments/${a.apartmentId}`)}>
                                    <td>{a.apartmentId}</td>
                                    <td>{a.number}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Wydarzenia */}
                <h2>Wydarzenia</h2>
                {!data.events || data.events.length === 0 ? (
                    <p>Brak wydarzeń w tym budynku</p>
                ) : (
                    <div className="card">
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tytuł</th>
                                <th>Data i godzina</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.events.map(e => (
                                <tr key={e.eventId} style={{ cursor: "pointer" }} onClick={() => navigate(`/events/${e.eventId}`)}>
                                    <td>{e.eventId}</td>
                                    <td>{e.title}</td>
                                    <td>{e.eventTime}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}