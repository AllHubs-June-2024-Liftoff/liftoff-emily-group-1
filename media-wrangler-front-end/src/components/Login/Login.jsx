import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Field, ErrorMessage, FormikProvider, useFormik } from "formik";
import { useAuth } from "../../Services/AuthContext";
import "../../stylings/Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { loginAction } = useAuth();
    const [error, setError] = useState("");

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                await loginAction(values);
                navigate("/");
            } catch (err) {
                setError(err.message || "Login failed. Please retry!");
            }
        },
    });

    return (
        <div className="login-background">
            <div className="login-form-container">
                <img src="/Media Wrangler.PNG" alt="Logo" className="login-logo" />
                <FormikProvider value={formik}>
                    <Form className="login-form">
                        <h1 className="login-title">Login</h1>

                        <div className="field-row">
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <Field
                                        className="input"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    <ErrorMessage name="username" component="p" className="help is-danger" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <Field
                                        className="input"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <ErrorMessage name="password" component="p" className="help is-danger" />
                                </div>
                            </div>
                        </div>

                        {error && <p className="help is-danger">{error}</p>}

                        <div className="field">
                            <div className="control">
                                <button type="submit" className="login-button is-primary is-halfwidth">
                                    Login
                                </button>
                            </div>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
}

