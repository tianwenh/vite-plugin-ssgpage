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

// TODO: make global cli: TS challenge, vitepress

interface Props {
  pages: PageMetadata[];
  home: string;
  indexRoute?: string;
  loadPageQuery?: () => Promise<PageQueryData[]>;
}
export const App: React.FC<Props> = (props) => {
  useScrollToTop();
  useScrollToAnchor();

  const pages = useMemo(() => {
    // TODO: consider sort this in @pages.
    return props.pages.sort((a, b) => {
      // Put order 0 last
      const aOrder = a.frontmatter.order || 9999;
      const bOrder = b.frontmatter.order || 9999;
      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
  }, [props.pages]);
  const indexElement = useMemo(() => {
    const page = pages.find((page) => page.routepath === props.indexRoute);
    return page ? <Page page={page}></Page> : <Pages pages={pages} />;
  }, [pages, props.indexRoute]);

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
        <Route index element={indexElement}></Route>
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
