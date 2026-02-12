import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "../pages/LoginPage.tsx";
import UsersPage from "../pages/userPages/UsersPage.tsx";
import HomeRedirect from "../components/HomeRedirect.tsx";
import MainLayout from "../components/MainLayout.tsx";
import CreateUserPage from "../pages/userPages/CreateUserPage.tsx";
import UsersListPage from "../pages/userPages/UsersListPage.tsx";
import EditUserPage from "../pages/userPages/EditUserPage.tsx";
import AssignApartmentPage from "../pages/userPages/UserAddApartmentPage.tsx";
import BuildingsListPage from "../pages/buildingPages/BuildingListPage.tsx";
import BuildingPage from "../pages/buildingPages/BuildingPage.tsx";
import CreateBuildingPage from "../pages/buildingPages/CreateBuildingPage.tsx";
import EditBuildingPage from "../pages/buildingPages/EditBuildingPage.tsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomeRedirect />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route element={<MainLayout />}>
                    <Route path='buildings/list' element={<BuildingsListPage />}/>
                    <Route path='buildings/:id' element={<BuildingPage />}/>
                    <Route path='buildings/create' element={<CreateBuildingPage />}/>
                    <Route path='buildings/edit/:id' element={<EditBuildingPage />}/>

                    <Route path='/users/create' element={<CreateUserPage />}/>
                    <Route path='/users/list' element={<UsersListPage />}/>
                    <Route path="/users/:id" element={<UsersPage />}/>
                    <Route path='/users/edit/:id' element={<EditUserPage />}/>
                    <Route path='/users/:id/assign-apartment' element={<AssignApartmentPage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}