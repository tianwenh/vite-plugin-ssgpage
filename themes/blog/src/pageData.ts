import type {} from '@tianwenh/vite-plugin-ssgpage';
import unsortedPages from '@pages';
import { slugify } from '@tianwenh/utils/string';
import { groupBy } from '@tianwenh/utils/array';

export const pages = unsortedPages.sort(
  (a, b) =>
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime()
);
export const pagesByTag = groupBy(pages, (page) => page.frontmatter.tags);
export const pagesByTagSlug = groupBy(pages, (page) =>
  page.frontmatter.tags.map(slugify)
);
export const tags = Object.keys(pagesByTag);
