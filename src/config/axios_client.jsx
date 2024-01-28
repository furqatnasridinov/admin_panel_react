import axios from "axios";
import AppConstants from "./app_constants";

const axiosClient = axios.create({
  baseURL: AppConstants.baseUrl,
  headers: {
    //Authorization: `Bearer ${localStorage.getItem(AppConstants.keyToken)}`,
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrNzk5OTIxNzI0OTQiLCJleHAiOjE3MDc4NDUwNDZ9.1U7hhJ3L4xFTFl6vtG1xQw1CjW2WTzb6yzaI4AU2eg-y60x_pIcnoolhStiBVyfNKp1BImWV4EHuea99WqO5oA",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
