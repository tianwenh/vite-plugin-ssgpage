import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import pages from '@pages';
import App from '@tianwenh/ssgpage-theme-blog';
import '@tianwenh/ssgpage-theme-blog/index.css';
// Code highlighting
import 'prismjs/themes/prism.css';
import 'katex/dist/katex.css';
import 'normalize.css';

// Using SSR in PROD
const render = import.meta.env.PROD ? ReactDOM.hydrate : ReactDOM.render;

render(
  <React.StrictMode>
    <BrowserRouter>
      <App pages={pages} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
