import { ToasterContainer } from 'components/shared/Toaster/ToasterContainer/ToasterContainer';
import { useAxiosInterceptors } from 'hooks/config/useAxiosInterceptors';
import LoginPage from 'pages/LoginPage/LoginPage';
import NotFound from 'pages/NotFound/NotFound';
import type { FC } from 'react';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateAuth from './PrivateRoutes/PrivateAuth';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import { routes } from './routes';

const App: FC = () => {
  useAxiosInterceptors();

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateAuth>
                  <LoginPage />
                </PrivateAuth>
              }
            />
            {routes.map(route => (
              <Route
                key={route.id}
                path={route.path}
                element={<PrivateRoute>{route.element}</PrivateRoute>}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <ToasterContainer />
    </>
  );
};

export default App;
