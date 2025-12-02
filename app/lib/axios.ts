import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.bircpc.ir/api/v1",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// هندل پاسخ
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // مدیریت خطاهای سمت سرور
    console.log("API Error:", error?.response);
    return Promise.reject(error);
  }
);
