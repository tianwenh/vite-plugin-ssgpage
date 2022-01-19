import type { Plugin } from 'vite';
import path from 'path';
import fs from 'fs-extra';
import { createServer } from 'vite';

interface SsrOptions {
  distPath: string;
  serverPath: string;
  templatePath: string;
  entryRoutes: string[];
}

function getNextRoutes(ssrHtml: string): string[] {
  const nextRoutes = [...ssrHtml.matchAll(/href="(\/.*?)"/g)].map(
    // Drop query string and hash.
    (r) => r[1].split(/[?#]/)[0]
  );
  return nextRoutes;
}

// Pre-render the app into static HTML.
export async function prerender(options: SsrOptions) {
  const vite = await createServer({
    server: { middlewareMode: 'ssr' },
    mode: 'production',
  });
  const { render } = await vite.ssrLoadModule(options.serverPath);
  const template = await fs.readFile(options.templatePath, 'utf-8');
  // "/" is assumed to be entry point.
  const pendingRoutes = options.entryRoutes.slice();
  const renderedRoutes = new Set(pendingRoutes);
  const saveFiles = [];
  while (pendingRoutes.length > 0) {
    const route = pendingRoutes.pop();
    if (!route) {
      continue;
    }
    const ssrHtml: string = render(route, {});
    for (const r of getNextRoutes(ssrHtml)) {
      if (!renderedRoutes.has(r)) {
        renderedRoutes.add(r);
        pendingRoutes.push(r);
      }
    }
    // Save to dist
    const routeName = route === '/' ? '/index' : route;
    const filePath = path.resolve(options.distPath, `.${routeName}.html`);
    saveFiles.push(
      fs.outputFile(filePath, template.replace(`<!--app-html-->`, ssrHtml))
    );
  }
  await Promise.all(saveFiles);
  console.log(`SSG generated: ${saveFiles.length}`);
  await vite.close();
}

export function ssg(options: SsrOptions): Plugin {
  return {
    name: 'ssg',
    enforce: 'post',
    apply(config, { command }) {
      return command === 'build' && !process.env['NO_SSG'];
    },
    async closeBundle() {
      await prerender(options);
    },
  };
}
