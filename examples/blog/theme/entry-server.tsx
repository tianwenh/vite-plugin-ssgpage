import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(location: string) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}
