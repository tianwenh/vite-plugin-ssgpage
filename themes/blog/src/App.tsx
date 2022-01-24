import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useScrollToTop, useScrollToAnchor } from '@tianwenh/utils/react/hooks';
import { restoreTheme } from '@tianwenh/utils/theme';
import type { PageMetadata } from '@pages';
// TODO: remove side effect timport
import type {} from '@tianwenh/vite-plugin-ssgpage';

import './App.css';

import { Layout } from './Layout';
import { Pages } from './Pages';
import { Page } from './Page';
import { Tags } from './Tags';
import { NotFound } from './NotFound';

// Skip SSR
if (typeof window !== 'undefined') {
  restoreTheme();
}

interface Props {
  pages: PageMetadata[];
}
export const App: React.FC<Props> = (props) => {
  const pages = useMemo(() => {
    return props.pages.sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
  }, [props.pages]);

  useScrollToTop();
  useScrollToAnchor();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pages pages={pages} />}></Route>
        <Route path="/tags" element={<Tags pages={pages} />}></Route>
        <Route path="/tags/:tagSlug" element={<Tags pages={pages} />}></Route>
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
};
