import React, { useState , StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './app';

import '@scss/index.scss';

const rootContainer = document.getElementById('root')!;

ReactDOM.createRoot(rootContainer).render(
  <StrictMode>
    <App />
  </StrictMode>
);
