# Who's Up There?

An interactive orbital index of the humans currently living beyond Earth.

## Built with

- [Astro](https://astro.build/) for the static site
- [Three.js](https://threejs.org/) for the interactive WebGL Earth
- [Launch Library 2](https://thespacedevs.com/llapi) for the current human spaceflight data
- GitHub Pages for hosting

The data refresh runs at build time. A scheduled GitHub Actions deployment rebuilds the site every six hours, while the last valid snapshot keeps the site useful if the upstream API is temporarily unavailable.

## Local development

Node 22.12 or newer is required.

```sh
npm install
npm run data:refresh
npm run dev
```

Build the production version with:

```sh
npm run build
```
