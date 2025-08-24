import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const api = axios.create({
  baseURL: BACKEND_URL + "/api",
});

api.interceptors.request.use(
  (config) => {
    const isAuthRoute = config.url?.startsWith("/auth/");
    if (!isAuthRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
