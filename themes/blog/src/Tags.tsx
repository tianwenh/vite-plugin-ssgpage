import React from 'react';
import { useParams } from 'react-router-dom';
import { Tag } from './Tag';
import { pagesByTagSlug, tags } from './pageData';
import { Pages } from './Pages';

const matchedPages = (tagSlug: string | undefined) => {
  const pages = tagSlug && pagesByTagSlug[tagSlug];
  if (!pages || pages.length === 0) {
    return <div>No pages...</div>;
  }
  return <Pages pages={pages} />;
};

export const Tags: React.FC = () => {
  const { tagSlug } = useParams<{ tagSlug: string }>();
  return (
    <>
      <section className="tags">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} className="card tag-card" />
        ))}
      </section>
      <hr></hr>
      {matchedPages(tagSlug)}
    </>
  );
};
