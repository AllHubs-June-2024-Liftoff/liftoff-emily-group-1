import React, { useState } from "react";
import { registerUser } from "../services/UserService";

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        const response = await registerUser(formData);
        if (response.error) {
            setMessage(response.error);
        } else {
            setMessage("User registered successfully!");
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="form-wrapper">
                <h2 className="title">Register</h2>
                {message && <p className="notification is-warning">{message}</p>}

                <div className="field-group">
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                </div>


                <div className="field-group">
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="firstname"
                                placeholder="Enter your first name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="lastname"
                                placeholder="Enter your last name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>


                <div className="field-group">
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
                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                onChange={handleChange}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="field is-grouped">
                    <button type="submit" className="button">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
