import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rootPackage from '../package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/tailwindcss-social' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  reactStrictMode: true,

  compiler: {
    removeConsole: isProd,
  },

  turbopack: {
    root: __dirname,
  },

  experimental: {
    optimizePackageImports: ['shiki'],
  },

  env: {
    TAILWINDCSS_SOCIAL_VERSION: rootPackage.version,
    BASE_PATH: basePath,
  },
};

export default nextConfig;
