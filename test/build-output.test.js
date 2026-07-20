import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = `/*! tailwindcss-social v${version} | MIT License`;

test('generated CSS preserves banner and vendor-prefixed declarations', () => {
  const css = fs.readFileSync('css/all.css', 'utf8');
  const minified = fs.readFileSync('css/all.min.css', 'utf8');

  assert.ok(css.startsWith(banner));
  assert.ok(minified.startsWith(banner));
  assert.match(css, /\n {2}-webkit-user-select: none;/);
  assert.doesNotMatch(css, /\n {2}webkit-user-select: none;/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /\.tw-social-btn:focus-visible/);
  assert.doesNotMatch(css, /@media \(forced-colors: active\)/);
});

test('docs use the published all-provider minified artifact', () => {
  const minified = fs.readFileSync('css/all.min.css', 'utf8');
  const docsCopy = fs.readFileSync('docs/public/all.min.css', 'utf8');

  assert.equal(docsCopy, minified);
});
