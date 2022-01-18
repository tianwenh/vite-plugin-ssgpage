# Blog demo

## Build

```
git clone
pnpm i
```

## Dev

Start two terminal windows, run:

```
npm run check
```

for TS checking,
and

```
npm run dev
```

for dev server.

## Write new posts

Simply add `md`, `mdx` under `pages/` folder.

## Local SSR

```
npm run build
npm run serve
```

## Deploy

Github actions [[.github/workflows/deploy.yml]] should auto build and deploy everytime `main` is pushed.

For rare manual build and deploy, run:

```
npm run deploy
```

## Custom theming

Change code under `./theme`.
