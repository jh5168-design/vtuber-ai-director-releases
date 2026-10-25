import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  // Static export: `npm run build` writes a self-contained site to `out/`.
  output: 'export',
  // Emit `page/index.html` so any static file server resolves clean URLs.
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // This app has its own lockfile; don't let Next pick the repository root.
  turbopack: { root: import.meta.dirname },
};

export default withMDX(config);
