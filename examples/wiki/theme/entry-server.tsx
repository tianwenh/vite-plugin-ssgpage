import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import pages from '@pages';
import App from '@tianwenh/ssgpage-theme-wiki';

export function render(location: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={location}>
        <App pages={pages} home="HTWiki" />
      </StaticRouter>
    </React.StrictMode>
  );
}
