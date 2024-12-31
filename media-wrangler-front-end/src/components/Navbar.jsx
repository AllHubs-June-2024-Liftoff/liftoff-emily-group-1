import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo-2.jpg"; 
import "../styles/Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">
                    <img src={logo} alt="Media Wrangler Logo" className="logo" />
                </Link>
                <div className="navbar-buttons">
                    <Link className="button is-link" to="/register">
                        Register
                    </Link>
                    <Link className="button is-link" to="/login">
                        Login
                    </Link>
                    <Link className="button is-link" to="/userinfo">
                        User Info
                    </Link>
                </div>
            </div>
        </nav>
    );
}
