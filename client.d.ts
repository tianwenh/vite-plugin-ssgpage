declare module '@pages' {
  import type { ComponentType } from 'react';
  export interface Frontmatter {
    title: string;
    subtitle: string;
    date: string;
    tags: string[];
    only: boolean;
    hide: boolean;
    [key: string]: unknown;
  }
  export interface PageMetadata {
    filepath: string;
    slug: string;
    frontmatter: Frontmatter;
    component: ComponentType<{
      components: Partial<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Record<keyof HTMLElementTagNameMap, ComponentType<any>>
      >;
    }>;
  }
  const metadata: PageMetadata[];
  export default metadata;
}

declare module '@pages/query' {
  export interface PageQueryData {
    slug: string;
    content: string;
  }
  export const pageQuerydata: PageQueryData[];
}
