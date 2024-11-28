import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for common headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve language from localStorage
    const language = localStorage.getItem("i18nextLng") || "en"; // Default to "en" if not set
    config.headers["Accept-Language"] = language; // Set Accept-Language header
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
