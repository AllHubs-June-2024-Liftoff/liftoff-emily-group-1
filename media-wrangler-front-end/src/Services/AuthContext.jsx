import React, { useContext, createContext, useState, useEffect } from "react";
import apiClient, { login, logout, checkSession, deleteProfile } from "./AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const stored = localStorage.getItem("user");
        const sessionRes = await checkSession(); 
        if (sessionRes.status === 200 && sessionRes.data?.sessionValid) {
          const sessionUserId = sessionRes.data.userId;
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.id !== sessionUserId) {
              const me = await apiClient.get(`/users/profile/${sessionUserId}`, {
                withCredentials: true,
              });
              setUser(me.data);
              localStorage.setItem("user", JSON.stringify(me.data));
            } else {
              setUser(parsed);
            }
          } else {
            const me = await apiClient.get(`/users/profile/${sessionUserId}`, {
              withCredentials: true,
            });
            setUser(me.data);
            localStorage.setItem("user", JSON.stringify(me.data));
          }
        } else {
          localStorage.removeItem("user");
          setUser(null);
        }
      } catch (err) {
        console.error("Session verification failed:", err.message);
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
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
    if (!user?.id) throw new Error("No session user");
    const payload = { ...data, id: user.id }; // force correct id
    const res = await apiClient.put(`/users/profile/${user.id}`, payload);
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  } catch (err) {
    console.error("Profile update failed:", err.response?.data || err.message);
    throw err;
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