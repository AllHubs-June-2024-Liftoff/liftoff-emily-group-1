import React, { useContext, createContext, useState, useEffect } from "react";
import apiClient, { login, logout, checkSession, deleteProfile } from "./AuthService";

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
          console.log("Stored user:", parsedUser);
          const response = await checkSession();
          console.log("Session verification response:", response);
    
          if (response.status === 200) {
            setUser(parsedUser); 
          } else {
            console.warn("Session status check returned:", response.status);

          }
        } catch (error) {
          console.error("Session verification failed:", error.message);

        }
      }
    
      setLoading(false);
    };
    

    initializeAuth();
  }, []);

  const loginAction = async (data) => {
    try {
      const response = await login(data);
      const { user } = response.data;
      console.log("Login successful", user);
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };
  
  const updateProfile = async (data) => {
    try {
      console.log("Updating profile with data:", data);
      const response = await apiClient.put(`/users/profile/${data.id}`, data);
      console.log("Profile updated successfully:", response.data);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error.message);
      throw error;
    }
  };
  

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

  const deleteProfileAction = async () => {
    try {
      if (user) {
        const response = await deleteProfile(user.id);
        console.log("Profile deleted successfully:", response.data);
        setUser(null);
        localStorage.removeItem("user");
        return response.data
      }
    } catch (error) {
      console.error("Error deleting profile:", error.response?.data || error.message)
      throw error;
    }
  }

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
        updateProfile,
        deleteProfile: deleteProfileAction,
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