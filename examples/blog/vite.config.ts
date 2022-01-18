import { defineConfig } from 'vite';
import path from 'path';
import { pages, mdx, ssg } from '@tianwenh/vite-plugin-ssgpage';

const distPath = path.resolve('./dist');
const templatePath = path.resolve(distPath, 'index.html');
const serverPath = path.resolve('./theme/entry-server.tsx');

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
      distPath,
      templatePath,
      serverPath,
      entryRoutes: ['/', '/404'],
    }),
  ],
});
