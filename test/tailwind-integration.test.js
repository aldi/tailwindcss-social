import assert from 'node:assert/strict';
import test from 'node:test';

import { compile } from 'tailwindcss';

import tailwindcssSocial from '../src/index.js';

test('Tailwind CSS-first plugin loading emits social components', async () => {
  const compiler = await compile(
    '@plugin "tailwindcss-social";\n@tailwind utilities;',
    {
      base: process.cwd(),
      loadModule: async (id, base) => ({
        module: id === 'tailwindcss-social' ? tailwindcssSocial : null,
        base,
      }),
    }
  );

  const css = compiler.build(['tw-social-btn', 'tw-social-provider-facebook']);

  assert.match(css, /\.tw-social-btn/);
  assert.match(css, /\.tw-social-provider-facebook/);
  assert.match(css, /prefers-reduced-motion/);
});

test('Tailwind CSS-first plugin options limit providers', async () => {
  const compiler = await compile(
    '@plugin "tailwindcss-social" { providers: facebook; }\n@tailwind utilities;',
    {
      base: process.cwd(),
      loadModule: async (id, base) => ({
        module: id === 'tailwindcss-social' ? tailwindcssSocial : null,
        base,
      }),
    }
  );

  const css = compiler.build([
    'tw-social-provider-facebook',
    'tw-social-provider-github',
  ]);

  assert.match(css, /\.tw-social-provider-facebook/);
  assert.doesNotMatch(css, /\.tw-social-provider-github/);
});

test('Tailwind JavaScript config limits output to selected providers', async () => {
  const config = {
    plugins: [tailwindcssSocial({ providers: ['facebook'] })],
  };
  const compiler = await compile(
    '@config "./tailwind.config.js";\n@tailwind utilities;',
    {
      base: process.cwd(),
      loadModule: async (_id, base, resourceHint) => ({
        module: resourceHint === 'config' ? config : null,
        base,
      }),
    }
  );

  const css = compiler.build([
    'tw-social-btn',
    'tw-social-provider-facebook',
    'tw-social-provider-github',
  ]);

  assert.match(css, /\.tw-social-provider-facebook/);
  assert.doesNotMatch(css, /\.tw-social-provider-github/);
  assert.match(css, /prefers-reduced-motion/);
});
