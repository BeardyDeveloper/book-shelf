import axios from 'axios';
import { toaster, ToastType } from 'components/shared/Toaster/Toaster';

export const useAxiosInterceptors = () => {
  const token = localStorage.getItem('token');

  axios.interceptors.request.use(
    config => {
      if (token && config.headers != null) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      config.baseURL = 'http://localhost:9000/';
      return config;
    },
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        toaster(ToastType.Error, {
          text: 'your Authorization has expired, you need to login again.',
        });
      }
      return Promise.reject(error);
    },
  );
};
