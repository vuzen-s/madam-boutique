import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Tạo một biến để theo dõi việc gửi yêu cầu refresh
let isRefreshing = false;

// Thêm một mảng chứa các yêu cầu cần thực hiện lại sau khi refresh
let subscribers = [];

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshToken = sessionStorage.getItem('refreshToken');
        
        try {
          const refreshResponse = await axios.post('http://localhost:8000/api/auth/refresh', { refresh_token: refreshToken });
          const newToken = refreshResponse.data.access_token;
          sessionStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          
          subscribers.forEach((callback) => callback(newToken));
          subscribers = [];

          return api(originalRequest);
        } catch (refreshError) {
          const navigate = useNavigate()
          // Xử lý khi không thể refresh token (ví dụ: chuyển hướng đến trang đăng nhập)
          sessionStorage.removeItem('token');
          window.location.href = '/signin';
        } finally {
          isRefreshing = false;
        }
      }

      // Tạo một promise để retry yêu cầu sau khi refresh
      const retryOriginalRequest = new Promise((resolve) => {
        subscribers.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });

      return retryOriginalRequest;
    }

    return Promise.reject(error);
  }
);

export default api;

