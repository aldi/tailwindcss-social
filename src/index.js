/**
 * Tailwind CSS Social Plugin
 * Adds social media color utilities and button components to Tailwind CSS.
 *
 * @example
 * // tailwind.config.js
 * import tailwindcssSocial from 'tailwindcss-social';
 *
 * export default {
 *   plugins: [tailwindcssSocial],
 * };
 */

import { providers, providerNames } from './providers.js';
import { buildProviderColorTokens } from './tokens.js';
import {
  generateBaseComponents,
  generateProviderComponents,
  generateProviderUtilities,
} from './styles.js';

/**
 * Build provider colors map for manual consumer access.
 * @returns {Record<string, {DEFAULT: string, light: string, dark: string}>}
 */
function buildThemeColors() {
  const colors = {};

  for (const name of providerNames) {
    const tokens = buildProviderColorTokens(providers[name].color);

    colors[name] = {
      DEFAULT: tokens.color,
      light: tokens.colorLight,
      dark: tokens.colorDark,
    };
  }

  return colors;
}

/**
 * Validate and normalize selected providers.
 * @param {unknown} providersOption
 * @returns {string[]}
 */
function resolveSelectedProviders(providersOption) {
  if (providersOption === undefined) {
    return providerNames;
  }

  if (!Array.isArray(providersOption)) {
    throw new TypeError(
      'tailwindcss-social: "providers" option must be an array of provider names.'
    );
  }

  const uniqueProviders = [...new Set(providersOption)];
  const invalidProviders = uniqueProviders.filter(
    (name) => !Object.hasOwn(providers, name)
  );

  if (invalidProviders.length > 0) {
    throw new Error(
      `tailwindcss-social: unknown provider name(s): ${invalidProviders.join(', ')}.`
    );
  }

  return uniqueProviders;
}

/**
 * Tailwind CSS plugin factory.
 * @param {{providers?: string[]}} [options]
 * @returns {(api: {addComponents: (components: Record<string, object>) => void}) => void}
 */
export default function tailwindcssSocial(options = {}) {
  const selectedProviders = resolveSelectedProviders(options.providers);

  return function ({ addComponents }) {
    const components = generateBaseComponents();

    for (const name of selectedProviders) {
      Object.assign(
        components,
        generateProviderComponents(name, providers[name])
      );
      Object.assign(
        components,
        generateProviderUtilities(name, providers[name])
      );
    }

    addComponents(components);
  };
}

// Also export theme extension for manual configuration.
tailwindcssSocial.colors = buildThemeColors();

// Export for CommonJS compatibility.
tailwindcssSocial.default = tailwindcssSocial;
