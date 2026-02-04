import axios from "axios";

const API_BASE = "/api";

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle API response format
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data && typeof data === "object" && "success" in data) {
      if (!data.success) {
        return Promise.reject(new Error(data.error || "Request failed"));
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.data?.error) {
      return Promise.reject(new Error(error.response.data.error));
    }
    return Promise.reject(error);
  },
);
