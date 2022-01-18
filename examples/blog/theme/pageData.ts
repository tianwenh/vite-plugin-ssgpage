import unsortedPages from '@pages';
import type { PageMetadata } from '@pages';
import { slugify } from '@tianwenh/utils/string';

export const pages = unsortedPages.sort(
  (a, b) =>
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
);
export const pagesByTag: Record<string, PageMetadata[]> = pages.reduce(
  (acc, page) => {
    page.frontmatter.tags.forEach((tag) => {
      acc[tag] = [...(acc[tag] ?? []), page];
    });
    return acc;
  },
  {} as Record<string, PageMetadata[]>
);
export const pagesByTagSlug: Record<string, PageMetadata[]> = Object.entries(
  pagesByTag
).reduce((acc, [tag, pages]) => {
  const slug = slugify(tag);
  acc[slug] = [...(acc[slug] ?? []), ...pages];
  return acc;
}, {} as Record<string, PageMetadata[]>);
export const tags = Object.keys(pagesByTag);
