import React, { useContext, createContext, useState, useEffect } from "react";
import { login, logout, checkSession } from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const response = await verifySession();
          if (response.status === 200) {
            setUser(parsedUser);
          } else {
            throw new Error("Session invalid");
          }
        } catch (error) {
          console.error("Session verification failed:", error.message);
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await login(data); 
      const { user } = response.data
      console.log("Login successful", response.data);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        throw new Error("Invalid response form the server");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    } 
  }

  const logoutAction = async (data) => {
    try {
      const response = await logout(data); 
      console.log("Logout successful", response.data);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw error;
    } 
  };

  // const checkSessionAction = async (data) => {
  //   try {
  //     const response = await checkSession(data); 
  //       console.log("Session status", response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch session status", error.response?.data || error.message);
  //   } 
  // }

  return ( 
    <AuthContext.Provider
      value={{
        user,
        loginAction,
        logoutAction,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
    )
  };

export const useAuth = () => {
  return useContext(AuthContext);
}