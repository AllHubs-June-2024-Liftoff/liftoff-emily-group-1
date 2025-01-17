import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/users/profile";

const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export default {
    getUserById,
};