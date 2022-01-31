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
  const { date, subtitle } = props.page.frontmatter;
  const dateTime = date ? new Date(date).toLocaleDateString() : '';

  return (
    <>
      <h2 className="page-title">
        <Link to={`/${props.page.routepath}`}>
          {props.page.frontmatter.title}
        </Link>
      </h2>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      <small>
        {dateTime && (
          <time dateTime={dateTime} className="page-info">
            {dateTime}
          </time>
        )}
        {props.page.frontmatter.tags.map((tag) => {
          return <Tag key={tag} tag={tag} className="page-info"></Tag>;
        })}
      </small>
    </>
  );
};

const PageLinks: React.FC<Props> = (props) => {
  const { links, backlinks } = props.page.frontmatter;
  if (links.length + backlinks.length === 0) {
    return <></>;
  }

  const toUl = (links: string[], title: string) => {
    if (links.length === 0) {
      return <></>;
    }
    return (
      <>
        <h2>{title}</h2>
        <ul>
          {links.map((link) => {
            return (
              <li key={link}>
                <Link to={`/${link}`}>{link}</Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  return (
    <>
      <hr />
      {toUl(links, 'Links')}
      {toUl(backlinks, 'Backlinks')}
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
      <PageLinks page={props.page} />
      <hr />
      <footer>EOF</footer>
    </>
  );
};
