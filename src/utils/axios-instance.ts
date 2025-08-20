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

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error.response.status;
    const errorMSG = error.response.data.message;
    if (status === 401 && errorMSG === "Unauthenticated.") {
      localStorage.removeItem("access-token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
