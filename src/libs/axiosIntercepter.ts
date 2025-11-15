// import { getToken } from '@/services/auth';
// import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// import { Env } from './Env';

// import 'client-only';
// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: Env.NEXT_PUBLIC_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// });

// // Request interceptor with InternalAxiosRequestConfig
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = getToken();

//     // If token exists, attach it to the Authorization header
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   },
// );

// // Response interceptor

// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // Success response - return as is
//     return response;
//   },
//   (error: any) => {
//     console.error('Axios interceptor error:', error);

//     const status = error?.response?.status;

//     if (status === 401) {
//       // Clear local storage
//       localStorage.clear();

//       // Optional: check if already on login page
//       if (!window.location.pathname.includes('/sign-in')) {
//         window.location.href = '/sign-in'; // You can also use react-router's navigate
//       }
//     }

//     return Promise.reject(error); // Let the calling function handle the error
//   },
// );

// export default axiosInstance;
