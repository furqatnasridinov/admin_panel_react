import axios from "axios";
import AppConstants from "./app_constants";

const axiosClient = axios.create({
  baseURL: AppConstants.baseUrl,
  headers: {
    //Authorization: `Bearer ${localStorage.getItem(AppConstants.keyToken)}`,
    Authorization:
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrNzk5OTIxNzI0OTQiLCJleHAiOjE3MTAzNTIzNjF9.xvxomjefo77p82FmLKHZ8bnmDEWSZB_M7nig3ntacLQVIlinAfIikDaq8uZbyK8OjUbQFA8wJ57QYMoRtjd7eQ",
    "Content-Type": "application/json",
  },
});

export default axiosClient;
