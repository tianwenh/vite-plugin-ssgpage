import React from 'react';
import { Link } from 'react-router-dom';
import { MdxLink } from '@tianwenh/utils/react/Mdx';
import type { PageMetadata } from '@tianwenh/vite-plugin-ssgpage';

import { Tag } from './Tag';

interface Props {
  page: PageMetadata;
}

// Show page brief
export const PageMeta: React.FC<Props> = (props) => {
  const date = new Date(props.page.frontmatter.date).toLocaleDateString();
  return (
    <>
      <h2 className="page-title">
        <Link to={`/${props.page.slug}`}>{props.page.frontmatter.title}</Link>
      </h2>
      <p className="page-subtitle">{props.page.frontmatter.subtitle}</p>
      <small>
        <time dateTime={date} className="page-info">
          {date}
        </time>
        {props.page.frontmatter.tags.map((tag) => {
          return <Tag key={tag} tag={tag} className="page-info"></Tag>;
        })}
      </small>
    </>
  );
};

const MDX_COMPONENTS = {
  a: MdxLink,
};

// Show entire page content
export const Page: React.FC<Props> = (props) => {
  return (
    <>
      <header>
        <PageMeta page={props.page} />
      </header>
      <hr />
      <props.page.component components={MDX_COMPONENTS} />
      <hr />
      <footer>EOF</footer>
    </>
  );
};
