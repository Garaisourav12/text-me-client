import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import PrivateRoute1 from "./components/PrivateRoute1";
import PrivateRoute2 from "./components/PrivateRoute2";

function App() {
    return (
        <div className="h-screen flex items-center justify-center bg-[#1d232a] text-gray-300">
            <Toaster />
            <Routes>
                {/* Private Routes */}
                <Route element={<PrivateRoute1 />}>
                    <Route path="/" element={<HomePage />} />
                </Route>
                <Route element={<PrivateRoute2 />}>
                    <Route path="/register" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
