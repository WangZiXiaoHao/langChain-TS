// src/lib/request.ts
import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// 引入 sonner 的 toast 函数
import { toast } from "sonner";

// 1. 创建 Axios 实例
const Service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// 2. 请求拦截器
Service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. 响应拦截器
Service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 假设后端统一返回格式为 { code: 200, data: any, message: string }
    if (res.code === 200) {
      return res.data;
    }

    // 业务错误处理：使用 sonner 的 error 方法
    toast.error("请求失败", {
      description: res.message || "未知业务错误",
    });
    return Promise.reject(new Error(res.message || "Error"));
  },
  (error) => {
    let message = "网络请求异常";
    if (error.response) {
      switch (error.response.status) {
        case 401:
          message = "登录已过期，请重新登录";
          // TODO: 触发登出逻辑
          break;
        case 403:
          message = "没有权限访问该资源";
          break;
        case 500:
          message = "服务器内部错误";
          break;
        default:
          message = error.response.data?.message || `请求失败 (${error.response.status})`;
      }
    } else if (error.code === 'ECONNABORTED') {
      message = "请求超时";
    }

    // 网络或 HTTP 状态码错误处理
    toast.error("系统提示", {
      description: message,
    });

    return Promise.reject(error);
  }
);

export default Service;