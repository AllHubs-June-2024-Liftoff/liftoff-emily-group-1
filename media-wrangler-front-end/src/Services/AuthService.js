import axios from "axios";

const apiClient = axios.create ({
    baseURL: 'http://localhost:8080'
});

export const login = (data) => {
    return apiClient.post('/users/login', data);
};

export const logout = (data) => {
    return apiClient.post('/users/logout', data)
};

export const checkSession = (data) => {
    return apiClient.post('/users/session-status', data);
};

apiClient.interceptors.response.use(
    response => response,
    error => {
        console.error('API call failed:', error);
        if (error.response.status === 401) {
            console.error('Unauthorized');
        } else if (error.response.status === 404) {
            console.error('Not found');
        }
        return Promise.reject(error);
    }
);

export default apiClient;