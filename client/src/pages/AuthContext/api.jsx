import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const api = axios.create({
  baseURL: 'http://localhost:8000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// let isRefreshing = false;
// let failedRequests = [];

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const navigate = useNavigate();

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         try {
//           const token = await new Promise((resolve) => {
//             failedRequests.push(resolve);
//           });
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return api(originalRequest);
//         } catch (err) {
//           navigate("/");
//           return Promise.reject(err);
//         }
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const response = await api.post('/api/auth/refresh');
//         const newToken = response.data.access_token;
//         localStorage.setItem('token', newToken);
//         api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

//         // Thực hiện lại yêu cầu gốc với access_token mới
//         processQueue(null, newToken);
//         return api(originalRequest);
//       } catch (err) {
//         navigate('/')
//         processQueue(err, null);
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Xử lý queue cho các yêu cầu đã bị từ chối vì access_token hết hạn
// function processQueue(error, token = null) {
//   for (let prom of failedRequests) {
//     if (error) {
//       prom(error);
//     } else {
//       prom(token);
//     }
//   }
//   failedRequests = [];
// }

export default api;

