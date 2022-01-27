import React from 'react';
import type { PageMetadata } from '@tianwenh/vite-plugin-ssgpage';

import { PageMeta } from './Page';

interface Props {
  pages: PageMetadata[];
}

// List of page's metadata
export const Pages: React.FC<Props> = (props) => {
  return (
    <>
      {props.pages.map((page) => {
        return (
          <article key={page.routepath} className="card pages-card">
            <PageMeta page={page} />
          </article>
        );
      })}
    </>
  );
};
