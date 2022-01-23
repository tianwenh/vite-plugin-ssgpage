import React from 'react';
import type { PageMetadata } from '@pages';

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
          <article key={page.slug} className="card pages-card">
            <PageMeta page={page} />
          </article>
        );
      })}
    </>
  );
};
