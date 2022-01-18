import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { restoreTheme } from '@tianwenh/utils/theme';

restoreTheme();

// Using SSR in PROD
const render = import.meta.env.PROD ? ReactDOM.hydrate : ReactDOM.render;

render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
