import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import pages from '@pages';
import type { PageQueryData } from '@tianwenh/vite-plugin-ssgpage';
import App from '@tianwenh/ssgpage-theme-wiki';
import '@tianwenh/ssgpage-theme-wiki/index.css';
// Code highlighting
import 'prismjs/themes/prism.css';
import 'katex/dist/katex.css';
import 'normalize.css';

// Using SSR in PROD
const render = import.meta.env.PROD ? ReactDOM.hydrate : ReactDOM.render;

async function loadPageQuery(): Promise<PageQueryData[]> {
  const data = await import('@pages/query');
  return data.default;
}
render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        pages={pages}
        home="HTWiki"
        loadPageQuery={loadPageQuery}
        indexRoute="README"
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
