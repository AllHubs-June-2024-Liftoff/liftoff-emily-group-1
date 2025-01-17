import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PrivateRoutes = () => {
    const user = useAuth();
    if (!user.token) return <Navigate to = "/login" />;
    return <Outlet />
}