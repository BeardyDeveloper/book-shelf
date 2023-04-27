import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useMainStore } from 'store/mainStore';

interface PrivateAuth {
  children: ReactElement;
}

const PrivateAuth: FC<PrivateAuth> = ({ children }) => {
  const { auth } = useMainStore();
  const { token } = auth;

  return token == null ? children : <Navigate to="/Categories" />;
};

export default PrivateAuth;
