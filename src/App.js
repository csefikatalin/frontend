import {  Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import KezdolapUser from "./pages/KezdolapUser";
import UserLayout from "./layouts/UserLayout";


function App() {
    return (
        <>

            <Routes>
                <Route  element={<AdminLayout />}>
                    <Route path="/" element={<Kezdolap />} />
                </Route>
                <Route  element={<UserLayout />}>
                    <Route path="/" element={<KezdolapUser />} />
                </Route>
                <Route  element={<VendegLayout />}>
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />

                </Route>
            </Routes>
        </>
    );
}

export default App;
