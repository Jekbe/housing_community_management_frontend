import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function HomeRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (! token) {
            navigate("/login", { replace: true });
        } else {
            navigate(`/users/${userId}`, { replace: true });
        }
    }, [navigate]);

    return null;
}