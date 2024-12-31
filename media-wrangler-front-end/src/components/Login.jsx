import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

export default function Login() {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
    const [message, setMessage] = useState("");
    const [verificationMessage, setVerificationMessage] = useState("");
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) return;
        
            try {
                const response = await axios.get(`http://localhost:8080/api/users/verify?token=${token}`);
                setVerificationMessage("Email verified successfully!");
                setTimeout(() => {
                    window.location.href = "/login"; // Redirect to login page
                }, 10); // Delay for 2 seconds to show the message
            } catch (error) {
                setVerificationMessage(error.response?.data || "Invalid or expired verification link.");
            }
        };
        

        verifyEmail();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/users/login", formData);
            setMessage("Login successful!");
        } catch (error) {
            setMessage(error.response?.data || "Invalid username/email or password.");
        }
    };

    return (
        <div className="login-container">
            {verificationMessage && (
                <div className="form-wrapper">
                    <h2 className="title">Email Verification</h2>
                    <p className="notification is-info">{verificationMessage}</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="form-wrapper">
                <h2 className="title">Login</h2>
                {message && <p className={`notification ${message.includes("successful") ? "is-success" : "is-warning"}`}>{message}</p>}
                <div className="field">
                    <label className="label">Username or Email</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            name="usernameOrEmail"
                            placeholder="Enter your username or email"
                            onChange={handleChange}
                            required
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            required
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
                <div className="field is-grouped">
                    <button type="submit" className="button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
