import axios from "axios";

export async function apiRegister(registerData) {
    try {
        const response = await axios.post(
            "http://localhost:8080/users/register",
            registerData
        );
        console.log("Response:", response);
        if (response.status === 201) {
            console.log("Navigating to login");
            return "Success"
        } else {
            return "Registration failed. Please try again"
        }
    } catch (error) {
        console.log("Error object:", error);
        if (error.response) {
            const backendErrors = error.response.data || {};
            console.log("Backend errors:", backendErrors);
            return backendErrors;
        } else {
            console.error("Unexpected error:", error);
            return "An error occured. Please try again"
        };
        
    }
}