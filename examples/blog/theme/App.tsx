import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { pages } from './pageData';
// Code highlighting
import 'prismjs/themes/prism.css';
import 'normalize.css';
import 'katex/dist/katex.css';
import './App.css';

import { Layout } from './Layout';
import { Pages } from './Pages';
import { Page } from './Page';
import { Tags } from './Tags';
import { NotFound } from './NotFound';

export default function App() {
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

// Scroll to top when navigating to new pages
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

function useScrollToAnchor() {
  const { hash } = useLocation();
  useEffect(() => {
    const anchor = document.getElementById(hash.slice(1));
    anchor?.scrollIntoView({ behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
