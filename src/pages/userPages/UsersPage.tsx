import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    deleteApartmentForUser,
    deleteUser,
    getUserProfile,
    type Role,
    roleLabel,
    type UserProfileResponse
} from "../../api/usersApi.ts";
import {CollapsibleSection} from "../../components/CollapsibleSection.tsx";

export default function UserPage() {
    const {id} = useParams();
    const [data, setData] = useState<UserProfileResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        getUserProfile(Number(id))
            .then(setData)
            .catch(() => {
                setError("Brak dostępu");
                if (id === localStorage.getItem('userId')) {
                    localStorage.clear();
                    navigate('/login');
                }
            });
    }, [id, navigate]);

    if (error) return <p className="text-red">{error}</p>;
    if (!data) return <p>Ładowanie...</p>;
    console.log(localStorage.getItem('role'))

    return (
        <div className="user-page">
            <header className="user-header">
                <p>id: {data.userId}, id profilu: {data.profileId}</p>
                <h1>{data.name} {data.surname}</h1>
                <p>Email: {data.email}</p>
                <p>PESEL: {data.pesel}</p>
                <p>Rola: {roleLabel[data.role as Role]}</p>
                {(localStorage.getItem('role') === 'HOUSING_MANAGER' || data.userId === Number(localStorage.getItem('userId'))) && (
                    <button className="button" onClick={() => navigate(`/users/edit/${data.userId}`)}>
                        Edytuj profil
                    </button>
                )}
                {localStorage.getItem('role') !== "RESIDENT" && data.role === "RESIDENT" && (
                    <button
                        className="button"
                        onClick={() => navigate(`/users/${data.userId}/assign-apartment`)}
                        style={{ marginTop: "10px" }}
                    >
                        + Przypisz mieszkanie
                    </button>
                )}
            </header>

            <section className="user-sections">
                {localStorage.getItem('role') !== 'RESIDENT' && (
                    <CollapsibleSection title={"Budynki"} hasContent={data.managedBuildings.length > 0}>
                        <ul>
                            {data.managedBuildings.map(managedBuilding => (
                                <li key={managedBuilding.buildingID}>
                                    {managedBuilding.buildingID} - {managedBuilding.address.country} - {managedBuilding.address.postalCode} - {managedBuilding.address.city} - {managedBuilding.address.street} - {managedBuilding.address.buildingNumber}
                                </li>
                            ))}
                        </ul>
                    </CollapsibleSection>
                )}

                <CollapsibleSection title="Mieszkania" hasContent={data.apartments.length > 0}>
                    <ul>
                        {data.apartments.map(apartment => (
                            <li key={apartment.apartmentId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>
                                    {apartment.apartmentId} - {apartment.number}
                                </span>
                                {localStorage.getItem('role') !== "RESIDENT" && data.role === "RESIDENT" && (
                                    <button className="button" style={{ marginLeft: "10px", padding: "4px 8px" }} onClick={
                                        async (e) => {
                                            e.stopPropagation();
                                            try {
                                                await deleteApartmentForUser(data.userId, apartment.apartmentId);
                                                setData(prev => prev ? {
                                                    ...prev,
                                                    apartments: prev.apartments.filter(a => a.apartmentId !== apartment.apartmentId)
                                                } : null);
                                            } catch (err) {
                                                console.error(err);
                                                alert("Błąd przy usuwaniu mieszkania");
                                            }
                                        }}>
                                        Usuń
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title={"Wydarzenia"} hasContent={data.events.length > 0}>
                    <ul>
                        {data.events.map(event => (
                            <li key={event.eventId}>
                                {event.eventId} - {event.title} - {event.eventTime}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title="Opłaty" hasContent={data.invoices.length > 0}>
                    <ul>
                        {data.invoices.map(invoice => (
                            <li key={invoice.invoiceId}>
                                {invoice.invoiceId} - {invoice.amount} zł - {invoice.status} - {invoice.dueTime}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title={"Awarie"} hasContent={data.failures.length > 0}>
                    <ul>
                        {data.failures.map(failure => (
                            <li key={failure.failureId}>
                                {failure.failureId} - {failure.description} - {failure.status} - {failure.creationTime}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>

                <CollapsibleSection title={"Skargi"} hasContent={data.complaints.length > 0}>
                    <ul>
                        {data.complaints.map(complaint => (
                            <li key={complaint.complaintId}>
                                {complaint.complaintId} - {complaint.description} - {complaint.status} - {complaint.creationTime}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
                
                <CollapsibleSection title={"Płatności"} hasContent={data.payments.length > 0}>
                    <ul>
                        {data.payments.map(payment => (
                            <li key={payment.paymentId}>
                                {payment.paymentId} - {payment.amount} - {payment.paymentTime}
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
            </section>

            {localStorage.getItem('role') === 'HOUSING_MANAGER' && (
                <button className="button" onClick={() => deleteUser(data?.userId)}>
                    usuń profil
                </button>
            )}
        </div>
    );
}
