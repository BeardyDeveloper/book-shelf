import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useMainStore } from 'store/mainStore';

interface PrivateRoute {
  children: ReactElement;
}

const PrivateRoute: FC<PrivateRoute> = ({ children }) => {
  const { auth } = useMainStore();
  const { token } = auth;

  return token != null ? children : <Navigate to="/" />;
};

export default PrivateRoute;
