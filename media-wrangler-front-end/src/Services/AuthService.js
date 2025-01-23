import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true, 
  });

export const login = (data) => {
    return apiClient.post('/users/login', data);
};

export const logout = (data) => {
    return apiClient.post('/users/logout', data)
};

export const deleteProfile = (userId) => {
  return apiClient.delete(`/users/profile/${userId}`);
};

export const checkSession = async () => {
    try {
      const response = await apiClient.get('/users/session-status'); 
      console.log("Session status response:", response.data);
      return response; 
    } catch (error) {
      console.error("Session status check failed:", error.response?.data || error.message);
      throw error;
    }
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