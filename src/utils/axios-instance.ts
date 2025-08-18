import axios from "axios";
import { BaseUrl } from "./constants";

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access-token");
    req.headers.Authorization = token ? `Bearer ${token}` : "";
    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
