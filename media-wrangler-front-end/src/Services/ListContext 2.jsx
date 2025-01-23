import React, { createContext, useContext, useState, useEffect } from "react";

const ListContext = createContext();

export const useListContext = () => useContext(ListContext);

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/lists/user-lists?userId=1");
        if (response.ok) {
          const data = await response.json();
          setLists(data);
        } else {
          console.error("Failed to fetch lists.");
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  return <ListContext.Provider value={{ lists, setLists }}>{children}</ListContext.Provider>;
};
