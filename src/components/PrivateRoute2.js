import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute2() {
    const { auth, loading } = useAuth();

    if (loading) {
        return <div className="text-center py-8 w-full">Loading...</div>;
    }

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PrivateRoute2;
