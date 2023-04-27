import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'store/mainStore';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyles';
import { lightBase } from 'theme/lightBase';

import App from './components/layout/App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider theme={lightBase}>
        <GlobalStyle language="en" theme={lightBase} />
        <App />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
