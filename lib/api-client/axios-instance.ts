import axios from "axios";

const API_BASE = "/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract error message from API response if available
    const errorMessage = error.response?.data?.error || error.message || "Request failed";
    return Promise.reject(new Error(errorMessage));
  },
);
