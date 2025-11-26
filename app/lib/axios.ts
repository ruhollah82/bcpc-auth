import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 8000,
});

// درخواست قبل از ارسال
api.interceptors.request.use(
  (config) => {
    // اگر توکن داشتی اینجا اضافه کن
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

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
