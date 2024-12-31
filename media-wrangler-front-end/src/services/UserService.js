import axios from "axios";

axios.defaults.withCredentials = true;

const API_BASE_URL = "http://localhost:8080/api/users"

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "An unexpected error occurred." };
    }
};


export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Invalid username or password." };
    }
};


export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/info`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response?.data || { error: "Failed to fetch user info." };
    }
};

