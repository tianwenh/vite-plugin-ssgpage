import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useScrollToTop, useScrollToAnchor } from '@tianwenh/utils/react/hooks';
import { restoreTheme } from '@tianwenh/utils/theme';

// Code highlighting
import 'prismjs/themes/prism.css';
import 'normalize.css';
import 'katex/dist/katex.css';
import './App.css';

import { pages } from './pageData';
import { Layout } from './Layout';
import { Pages } from './Pages';
import { Page } from './Page';
import { Tags } from './Tags';
import { NotFound } from './NotFound';

// Skip SSR
if (typeof window !== 'undefined') {
  restoreTheme();
}

export function App() {
  useScrollToTop();
  useScrollToAnchor();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pages pages={pages} />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/tags/:tagSlug" element={<Tags />}></Route>
        {pages.map((page) => {
          return (
            <Route
              key={page.slug}
              path={`/${page.slug}`}
              element={<Page page={page}></Page>}
            ></Route>
          );
        })}
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}
