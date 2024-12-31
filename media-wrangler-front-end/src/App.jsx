import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import Login from "./components/Login";
import UserInfo from "./components/UserInfo";

import "./styles/Register.css";
import "./styles/Navbar.css";
import "./styles/Login.css";

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/userinfo" element={<UserInfo />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
