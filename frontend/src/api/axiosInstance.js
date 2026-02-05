import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // Backend URL
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Add interceptors for auth or error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
