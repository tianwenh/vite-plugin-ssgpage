import { defineConfig } from 'vite';
import path from 'path';
import { pages, mdx, ssg } from '@tianwenh/vite-plugin-ssgpage';

export default defineConfig({
  plugins: [
    mdx(),
    pages({
      globs: [
        {
          basepath: path.resolve('./pages'),
          filePattern: './**/*.{mdx,md}',
        },
      ],
    }),
    ssg({
      distPath: path.resolve('./dist'),
      templatePath: path.resolve('./dist/index.html'),
      serverPath: path.resolve('./theme/entry-server.tsx'),
      entryRoutes: ['/', '/404'],
    }),
  ],
});
