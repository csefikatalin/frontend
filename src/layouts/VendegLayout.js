import React from "react";

import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../contexts/AuthContext";
import NavigacioVendeg from "../pages/NavigacioVendeg";

export default function VendegLayout() {
    const { user } = useAuthContext(); 
      return !user ? <>    <NavigacioVendeg /> <Outlet /> </>  : <Navigate to="/" />;
}
