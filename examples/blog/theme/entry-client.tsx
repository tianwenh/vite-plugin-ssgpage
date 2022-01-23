import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '@tianwenh/ssgpage-theme-blog';
import '@tianwenh/ssgpage-theme-blog/index.css';

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
