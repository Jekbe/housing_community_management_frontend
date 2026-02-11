import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";
import UsersPage from "../pages/UsersPage.tsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/user/:id" element={<UsersPage />}/>
            </Routes>
        </BrowserRouter>
    );
}