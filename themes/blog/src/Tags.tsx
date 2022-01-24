import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Tag } from './Tag';
import { Pages } from './Pages';
import type { PageMetadata } from '@pages';
import { slugify } from '@tianwenh/utils/string';
import { groupBy } from '@tianwenh/utils/array';

const matchedPages = (
  pagesByTagSlug: Record<string, PageMetadata[]>,
  tagSlug: string | undefined
) => {
  const pages = tagSlug && pagesByTagSlug[tagSlug];
  if (!pages || pages.length === 0) {
    return <div>No pages...</div>;
  }
  return <Pages pages={pages} />;
};

interface Props {
  pages: PageMetadata[];
}

export const Tags: React.FC<Props> = (props) => {
  const tags = useMemo(() => {
    return Array.from(
      new Set(props.pages.flatMap((page) => page.frontmatter.tags))
    );
  }, [props.pages]);
  const pagesByTagSlug = useMemo(() => {
    return groupBy(props.pages, (page) => page.frontmatter.tags.map(slugify));
  }, [props.pages]);
  const { tagSlug } = useParams<{ tagSlug: string }>();
  return (
    <>
      <section className="tags">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} className="card tag-card" />
        ))}
      </section>
      <hr></hr>
      {matchedPages(pagesByTagSlug, tagSlug)}
    </>
  );
};
