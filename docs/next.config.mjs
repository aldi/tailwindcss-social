import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rootPackage from '../package.json' with { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/tailwindcss-social' : '';
const devNoCacheHeaders = [
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  },
  { key: 'Pragma', value: 'no-cache' },
  { key: 'Expires', value: '0' },
];

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

  ...(!isProd && {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: devNoCacheHeaders,
        },
      ];
    },
  }),
};

export default nextConfig;
