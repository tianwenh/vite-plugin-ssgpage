import type { ComponentType } from 'react';
import type { Plugin } from 'vite';
import fg from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { pick } from '@tianwenh/utils/object';
import { groupBy } from '@tianwenh/utils/array';

export interface Frontmatter {
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  order: number;
  only: boolean;
  hide: boolean;
  links: string[];
  backlinks: string[];
  [key: string]: unknown;
}
export interface PageMetadata {
  routepath: string;
  frontmatter: Frontmatter;
  component: ComponentType<{
    components: Partial<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<keyof HTMLElementTagNameMap, ComponentType<any>>
    >;
  }>;
}
export interface PageQueryData {
  routepath: string;
  content: string;
}

export interface PageGlob {
  basepath: string;
  filePattern: string;
}
export interface PageOptions {
  globs: PageGlob[];
}

const MODULE_NAME = '@pages';
const QUERY_MODULE_NAME = `${MODULE_NAME}/query`;

// Drop extension, basepath, `index`.
function getRoutepath(filepath: string, basepath: string): string {
  const subpath = filepath.replace(basepath, '');
  const parsed = path.parse(subpath);
  // Filename or its dir name if filename is just 'index'.
  const slug = path
    .resolve(parsed.dir, parsed.name === 'index' ? '' : parsed.name)
    .slice(1);
  return slug;
}

function getLinks(content: string): string[] {
  function getLink(line: string): string {
    const result = line.match(/^\[.+]:\s(.+)\.md/)?.[1];
    // TODO: consider use assert tool.
    if (!result) {
      throw new Error('Invalid wiki link');
    }
    return result;
  }

  const links = content
    .split(/\[\/\/begin]:.+/)[1]
    ?.split(/\[\/\/end]:/)[0]
    ?.split('\n')
    .filter((line) => !!line)
    .map(getLink);
  return links ?? [];
}
function fillBacklinks(pages: PageData[]): PageData[] {
  const backlinkByPage = groupBy(pages, (page) => page.frontmatter.links);
  return pages.map((page) => {
    const backlinks =
      backlinkByPage[page.routepath]?.map((p) => p.routepath) ?? [];
    return {
      ...page,
      frontmatter: {
        ...page.frontmatter,
        backlinks,
      },
    };
  });
}
interface PageData {
  routepath: string;
  filepath: string;
  frontmatter: Frontmatter;
  content: string;
}
async function loadPages(options: PageOptions): Promise<PageData[]> {
  const ms: PageData[][] = await Promise.all(
    options.globs.map(async (glob) => {
      const filepaths = await fg(path.resolve(glob.basepath, glob.filePattern));
      return Promise.all(
        filepaths.map(async (filepath) => {
          const routepath = getRoutepath(filepath, glob.basepath);
          const content = await fs.readFile(filepath, 'utf-8');
          const fm = matter(content);
          const title = fm.data['title'] ?? routepath;
          const subtitle = fm.data['subtitle'];
          const date = fm.data['date'];
          const tags = fm.data['tags'] ?? [];
          const order = fm.data['order'] ?? 0;
          const only = fm.data['only'] ?? false;
          const hide = fm.data['hide'] ?? false;
          const links = getLinks(content);
          const frontmatter: Frontmatter = {
            ...fm.data,
            title,
            tags,
            date,
            subtitle,
            order,
            only,
            hide,
            links,
            backlinks: [],
          };
          return { filepath, content, routepath, frontmatter };
        })
      );
    })
  );
  const meta = fillBacklinks(ms.flat());
  // For dev mode, only load marked posts.
  const onlymeta = meta.filter((m) => m.frontmatter.only);
  const onlyOrAll = onlymeta.length === 0 ? meta : onlymeta;
  const metadata = onlyOrAll.filter((m) => !m.frontmatter.hide);
  return metadata;
}

// generate script that exports list of page metadata
async function generatePageMetadata(options: PageOptions): Promise<string> {
  const ms = await loadPages(options);
  const componentImports = ms
    .map((m, i) => `import Component${i} from '${m.filepath}';`)
    .join('\n');
  const metadata: Omit<PageMetadata, 'component'>[] = ms.map((m) => {
    return pick(m, 'routepath', 'frontmatter');
  });
  const metadataWithComponent = metadata
    .map((m, i) => `{"component": Component${i},${JSON.stringify(m).slice(1)}`)
    .join(',');

  console.log(`${MODULE_NAME} loaded: ${metadata.length}`);

  return `
${componentImports}
export default [${metadataWithComponent}];
  `;
}

// generate script that exports list of page raw conent for search
async function generatePageQuerydata(options: PageOptions): Promise<string> {
  const ms = await loadPages(options);
  const metadata: PageQueryData[] = ms.map((m) =>
    pick(m, 'routepath', 'content')
  );

  console.log(`${QUERY_MODULE_NAME} loaded: ${metadata.length}`);

  return `
  export default ${JSON.stringify(metadata)};
    `;
}

export function pages(options: PageOptions): Plugin {
  return {
    name: 'pages',
    enforce: 'pre',
    resolveId(source) {
      if (source !== MODULE_NAME && source !== QUERY_MODULE_NAME) {
        return;
      }
      return source;
    },
    async load(id) {
      if (id === MODULE_NAME) {
        return generatePageMetadata(options);
      }
      if (id === QUERY_MODULE_NAME) {
        return generatePageQuerydata(options);
      }
      return;
    },
  };
}
