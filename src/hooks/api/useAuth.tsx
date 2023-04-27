import axios from 'axios';
import { toaster, ToastType } from 'components/shared/Toaster/Toaster';
import { useState } from 'react';

export interface AuthStoreProps {
  token: string | null;
  login: (userName: string, password: string) => void;
  logout: () => void;
}

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  const login = (userName: string, password: string) => {
    axios
      .post('auth/login', {
        username: userName,
        password,
      })
      .then(res => {
        if (res.data.statusCode === 200) {
          setToken(res.data.payload.token);
          localStorage.setItem('token', res.data.payload.token);
        } else {
          toaster(ToastType.Error, { title: res.data.message });
        }
      })
      .catch(err => {
        toaster(ToastType.Error, { title: err.response.data.message });
      });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  const result = {
    token,
    login,
    logout,
  } as const;

  return result;
};
