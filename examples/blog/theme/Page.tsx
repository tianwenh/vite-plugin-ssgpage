import React from 'react';
import type { PageMetadata } from '@pages';
import { Link } from 'react-router-dom';
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

const MdxLink: React.FC<{ href: string; title: string }> = (props) => {
  const isExternal = /^https?:\/\//.test(props.href);
  if (isExternal) {
    return <a target="_blank" {...props} />;
  }
  // Drop wiki link extension.
  const dropExtension = props.href.replace(/\.mdx?/, '');
  // <Link /> breaks header anchor.
  if (dropExtension.startsWith('#')) {
    return <a {...props} />;
  }
  return <Link {...props} to={dropExtension}></Link>;
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
