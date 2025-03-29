import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 这里可以根据后端返回的状态码做相应的处理
    if (res.code !== 200) {
      console.error('Response error:', res.message);
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  error => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// 封装GET请求
export function get(url, params) {
  return service.get(url, { params });
}

// 封装POST请求
export function post(url, data) {
  return service.post(url, data);
}

export default service;
