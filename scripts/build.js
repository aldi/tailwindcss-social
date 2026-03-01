import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import cssnano from 'cssnano';

import { providers, providerNames } from '../src/providers.js';
import {
  generateBaseComponents,
  generateProviderComponents,
  generateProviderUtilities,
} from '../src/styles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');
const CSS_DIR = path.join(ROOT, 'css');
const DOCS_PUBLIC_DIR = path.join(ROOT, 'docs', 'public');
const DOCS_ALL_MIN_FILE = path.join(DOCS_PUBLIC_DIR, 'all.min.css');

const pkg = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8')
);
const BANNER = `/*! tailwindcss-social v${pkg.version} | MIT License | github.com/aldi/tailwindcss-social */\n\n`;

/**
 * Convert camelCase to kebab-case for CSS properties.
 * @param {string} str
 * @returns {string}
 */
function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert a style object to a CSS declaration block.
 * @param {Record<string, string>} styles
 * @param {string} indent
 * @returns {string}
 */
function styleToCSS(styles, indent = '  ') {
  return Object.entries(styles)
    .map(([prop, value]) => `${indent}${toKebabCase(prop)}: ${value};`)
    .join('\n');
}

/**
 * Convert component definitions to CSS text.
 * Supports top-level at-rules with nested selectors.
 * @param {Record<string, Record<string, string>|Record<string, Record<string, string>>>} components
 * @param {string} indent
 * @returns {string}
 */
function componentsToCSS(components, indent = '') {
  return Object.entries(components)
    .map(([selector, styles]) => {
      if (selector.startsWith('@')) {
        return `${indent}${selector} {\n${componentsToCSS(styles, `${indent}  `)}\n${indent}}`;
      }

      return `${indent}${selector} {\n${styleToCSS(styles, `${indent}  `)}\n${indent}}`;
    })
    .join('\n\n');
}

/**
 * Build a full component map for a provider subset.
 * @param {string[]} selectedProviders
 * @returns {Record<string, Record<string, string>|Record<string, Record<string, string>>>}
 */
function buildComponents(selectedProviders) {
  const components = generateBaseComponents();

  for (const name of selectedProviders) {
    Object.assign(
      components,
      generateProviderComponents(name, providers[name])
    );
    Object.assign(components, generateProviderUtilities(name, providers[name]));
  }

  return components;
}

/**
 * Build CSS file with PostCSS processing.
 * @param {string} css
 * @param {string} outputDir
 * @param {string} outputName
 */
async function buildCSS(css, outputDir, outputName) {
  fs.mkdirSync(outputDir, { recursive: true });

  const outputFile = path.join(outputDir, `${outputName}.css`);
  const outputMinFile = path.join(outputDir, `${outputName}.min.css`);

  console.log(`Building: ${outputName}`);

  fs.writeFileSync(outputFile, BANNER + css);

  const minified = await postcss([cssnano]).process(css, {
    from: undefined,
    to: outputMinFile,
  });

  fs.writeFileSync(outputMinFile, minified.css);

  const size = (fs.statSync(outputMinFile).size / 1024).toFixed(2);
  console.log(`  ✓ ${outputFile}`);
  console.log(`  ✓ ${outputMinFile} (${size}KB)`);
}

/**
 * Build all providers in one CSS file.
 */
async function buildAll() {
  const css = componentsToCSS(buildComponents(providerNames));
  await buildCSS(css, CSS_DIR, 'all');
}

/**
 * Build individual provider files.
 */
async function buildSingle() {
  for (const name of providerNames) {
    const css = componentsToCSS(buildComponents([name]));
    const outputDir = path.join(CSS_DIR, 'single', name);
    await buildCSS(css, outputDir, name);
  }
}

/**
 * Keep docs CSS in sync with the generated root artifact.
 */
function syncDocsCSS() {
  if (!fs.existsSync(DOCS_PUBLIC_DIR)) {
    console.log(`  • Skipped docs sync (missing ${DOCS_PUBLIC_DIR})`);
    return;
  }

  fs.copyFileSync(path.join(CSS_DIR, 'all.min.css'), DOCS_ALL_MIN_FILE);
  console.log(`  ✓ ${DOCS_ALL_MIN_FILE}`);
}

/**
 * Main build function.
 */
async function main() {
  console.log('🔨 Building tailwindcss-social CSS...\n');
  const startTime = Date.now();

  await buildAll();
  console.log('');
  await buildSingle();
  console.log('');
  syncDocsCSS();

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Build completed in ${duration}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
