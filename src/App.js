import { Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import AdminLayout from "./layouts/AdminLayout";
import KezdolapUser from "./pages/KezdolapUser";
import UserLayout from "./layouts/UserLayout";
import useAuthContext from "./contexts/AuthContext";


function App() {
    const { user } = useAuthContext();
    return (
        <>

            <Routes>
                {/* Vendég layout */}
                {!user && (
                    <Route element={<VendegLayout />}>
                        <Route path="/" element={<Kezdolap />} />
                        <Route path="bejelentkezes" element={<Bejelentkezes />} />
                        <Route path="regisztracio" element={<Regisztracio />} />
                    </Route>
                )}

                {/* Admin és User ugyanazon útvonalon */}
                {user && (
                    <Route
                        path="/"
                        element={
                            user.role === 1 ? (
                                <AdminLayout />
                            ) : (
                                <UserLayout />
                            )
                        }
                    >
                        <Route index element={<Kezdolap />} />
                    </Route>
                )}
            </Routes>
        </>
    );
}

export default App;
