import type { PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import mdxjs from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'mdx-prism';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export function mdx(): PluginOption[] {
  return [
    ...react(),
    mdxjs({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypePrism,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { class: 'header-anchor' },
            content: {
              type: 'text',
              value: '#',
            },
          },
        ],
      ],
      jsxRuntime: 'classic',
    }),
  ];
}
