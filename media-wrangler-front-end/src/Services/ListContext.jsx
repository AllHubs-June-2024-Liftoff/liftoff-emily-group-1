// src/Services/ListContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const ListContext = createContext(null);

export function ListProvider({ children }) {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedForUserId, setLoadedForUserId] = useState(null);

  const fetchLists = useCallback(async () => {
    if (!user?.id) {
      setLists([]);
      setLoadedForUserId(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/lists/all", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lists");
      const data = await res.json();
      const userLists = Array.isArray(data) ? data.filter(l => l?.user?.id === user.id) : [];
      setLists(userLists);
      setLoadedForUserId(user.id);
    } catch (e) {
      console.error(e);
      setLists([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch on mount and whenever the user id changes (including after login/refresh)
  useEffect(() => {
    if (user?.id && loadedForUserId !== user.id) {
      fetchLists();
    }
  }, [user?.id, loadedForUserId, fetchLists]);

  // Public method to refresh on demand (e.g., after review submit)
  const refreshLists = useCallback(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <ListContext.Provider value={{ lists, loading, refreshLists, setLists }}>
      {children}
    </ListContext.Provider>
  );
}

export function useLists() {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("useLists must be used within a ListProvider");
  return ctx;
}
