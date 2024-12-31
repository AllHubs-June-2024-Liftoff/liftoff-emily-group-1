import React, { useState } from "react";
import { loginUser } from "../services/UserService";
import "../styles/Login.css"; 

export default function Login() {
    const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginUser(formData);
        if (response.error) {
            setMessage(response.error); 
        } else {
            setMessage("Login successful!");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <h2 className="title">Login</h2>
                {message && <p className="notification is-warning">{message}</p>}
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
