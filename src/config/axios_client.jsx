import axios from "axios";
import AppConstants from "./app_constants";

const axiosClient = axios.create({
  baseURL: AppConstants.baseUrl,
  headers: {
    //Authorization: `Bearer ${localStorage.getItem(AppConstants.keyToken)}`,
    Authorization:`Bearer ${localStorage.getItem(AppConstants.keyToken)}`,
    "Content-Type": "application/json",
  },
});

export default axiosClient;
