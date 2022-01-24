declare module '@pages' {
  import { PageMetadata } from './src/pages';
  const metadata: PageMetadata[];
  export default metadata;
}

declare module '@pages/query' {
  import { PageQueryData } from './src/pages';
  const pageQuerydata: PageQueryData[];
  export default pageQuerydata;
}
