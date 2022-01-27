import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useScrollToTop, useScrollToAnchor } from '@tianwenh/utils/react/hooks';
import { restoreTheme } from '@tianwenh/utils/theme';
import type {
  PageMetadata,
  PageQueryData,
} from '@tianwenh/vite-plugin-ssgpage';

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

// TODO: custom home page README.md etc
// TODO: wikilink

interface Props {
  pages: PageMetadata[];
  home: string;
  loadPageQuery?: () => Promise<PageQueryData[]>;
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
      <Route
        path="/"
        element={
          <Layout
            home={props.home}
            pages={pages}
            loadPageQuery={props.loadPageQuery}
          />
        }
      >
        <Route index element={<Pages pages={pages} />}></Route>
        <Route path="/tags" element={<Tags pages={pages} />}></Route>
        <Route path="/tags/:tagSlug" element={<Tags pages={pages} />}></Route>
        {pages.map((page) => {
          return (
            <Route
              key={page.routepath}
              path={`/${page.routepath}`}
              element={<Page page={page}></Page>}
            ></Route>
          );
        })}
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};
