import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getUserProfile, type UserProfileResponse} from "../api/usersApi.ts";

export default function UserPage() {
    const {id} = useParams();
    const [data, setData] = useState<UserProfileResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        getUserProfile(Number(id))
            .then(setData)
            .catch(() => setError("Brak dostępu"));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!data) return <p>loading...</p>;

    return (
        <div>
            <h1>
                {data.name} {data.surname}
            </h1>
            <p>Email: {data.email}</p>
            <p>Rola: {data.role}</p>

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}