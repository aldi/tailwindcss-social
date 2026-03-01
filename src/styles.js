/**
 * Shared style definitions for TailwindCSS-Social v1.
 * Used by both the Tailwind plugin (src/index.js) and the CSS build script (scripts/build.js).
 */

import {
  buildButtonVariantTokens,
  buildProviderColorTokens,
} from './tokens.js';

const SELECTORS = {
  button: '.tw-social-btn',
  buttonHover: '.tw-social-btn:hover',
  buttonFocus: '.tw-social-btn:focus-visible',
  buttonActive: '.tw-social-btn:active',
  buttonDisabled: '.tw-social-btn:disabled, .tw-social-btn.is-disabled',
  sizeSm: '.tw-social-btn.tw-social-size-sm',
  sizeMd: '.tw-social-btn.tw-social-size-md',
  sizeLg: '.tw-social-btn.tw-social-size-lg',
  iconOnly: '.tw-social-btn.tw-social-icon-only',
  iconOnlySm: '.tw-social-btn.tw-social-icon-only.tw-social-size-sm',
  iconOnlyMd: '.tw-social-btn.tw-social-icon-only.tw-social-size-md',
  iconOnlyLg: '.tw-social-btn.tw-social-icon-only.tw-social-size-lg',
  iconElements:
    '.tw-social-btn svg, .tw-social-btn [class*="icon"], .tw-social-btn i[class^="fa-"], .tw-social-btn i[class*=" fa-"]',
  iconElementsSm:
    '.tw-social-btn.tw-social-size-sm svg, .tw-social-btn.tw-social-size-sm [class*="icon"], .tw-social-btn.tw-social-size-sm i[class^="fa-"], .tw-social-btn.tw-social-size-sm i[class*=" fa-"]',
  iconElementsMd:
    '.tw-social-btn.tw-social-size-md svg, .tw-social-btn.tw-social-size-md [class*="icon"], .tw-social-btn.tw-social-size-md i[class^="fa-"], .tw-social-btn.tw-social-size-md i[class*=" fa-"]',
  iconElementsLg:
    '.tw-social-btn.tw-social-size-lg svg, .tw-social-btn.tw-social-size-lg [class*="icon"], .tw-social-btn.tw-social-size-lg i[class^="fa-"], .tw-social-btn.tw-social-size-lg i[class*=" fa-"]',
  iconLeft:
    '.tw-social-btn.tw-social-icon-left svg, .tw-social-btn.tw-social-icon-left [class*="icon"], .tw-social-btn.tw-social-icon-left i[class^="fa-"], .tw-social-btn.tw-social-icon-left i[class*=" fa-"]',
  iconRight:
    '.tw-social-btn.tw-social-icon-right svg, .tw-social-btn.tw-social-icon-right [class*="icon"], .tw-social-btn.tw-social-icon-right i[class^="fa-"], .tw-social-btn.tw-social-icon-right i[class*=" fa-"]',
  dataIconInlineStart: '.tw-social-btn [data-icon="inline-start"]',
  dataIconInlineEnd: '.tw-social-btn [data-icon="inline-end"]',
  variantLight: '.tw-social-btn.tw-social-variant-light',
  variantDark: '.tw-social-btn.tw-social-variant-dark',
  variantOutline: '.tw-social-btn.tw-social-variant-outline',
  variantInverted: '.tw-social-btn.tw-social-variant-inverted',
};

/**
 * Generate base button component styles.
 * @returns {Record<string, Record<string, string>|Record<string, Record<string, string>>>}
 */
export function generateBaseComponents() {
  return {
    [SELECTORS.button]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.375rem',
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      lineHeight: '1.25rem',
      textDecoration: 'none',
      borderRadius: '0.5rem',
      border: '1px solid var(--tw-social-btn-border, transparent)',
      backgroundColor:
        'var(--tw-social-btn-bg, var(--tw-social-color, hsl(0, 0%, 0%)))',
      color: 'var(--tw-social-btn-fg, var(--tw-social-on-color, #fff))',
      cursor: 'pointer',
      transition:
        'background-color 0.16s ease, border-color 0.16s ease, color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      '--tw-social-btn-ring':
        'var(--tw-social-btn-ring, var(--tw-social-color, hsl(0, 0%, 0%)))',
    },
    [SELECTORS.buttonHover]: {
      backgroundColor:
        'var(--tw-social-btn-bg-hover, var(--tw-social-btn-bg, var(--tw-social-color, hsl(0, 0%, 0%))))',
      color:
        'var(--tw-social-btn-fg-hover, var(--tw-social-btn-fg, var(--tw-social-on-color, #fff)))',
      textDecoration: 'none',
      transform: 'translateY(-1px)',
    },
    [SELECTORS.buttonFocus]: {
      outline: 'none',
      boxShadow:
        '0 0 0 3px color-mix(in srgb, var(--tw-social-btn-ring) 35%, transparent)',
    },
    [SELECTORS.buttonActive]: {
      backgroundColor:
        'var(--tw-social-btn-bg-active, var(--tw-social-btn-bg, var(--tw-social-color, hsl(0, 0%, 0%))))',
      color:
        'var(--tw-social-btn-fg-active, var(--tw-social-btn-fg, var(--tw-social-on-color, #fff)))',
      transform: 'translateY(0)',
    },
    [SELECTORS.buttonDisabled]: {
      opacity: '0.55',
      cursor: 'not-allowed',
      pointerEvents: 'none',
      transform: 'none',
    },
    [SELECTORS.sizeSm]: {
      padding: '0.375rem 0.625rem',
      gap: '0.3125rem',
      fontSize: '0.8125rem',
      lineHeight: '1.125rem',
    },
    [SELECTORS.sizeMd]: {
      padding: '0.5rem 0.75rem',
      gap: '0.375rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
    [SELECTORS.sizeLg]: {
      padding: '0.625rem 0.875rem',
      gap: '0.5rem',
      fontSize: '0.9375rem',
      lineHeight: '1.3125rem',
    },
    [SELECTORS.iconOnly]: {
      width: '2.5rem',
      height: '2.5rem',
      padding: '0',
    },
    [SELECTORS.iconOnlySm]: {
      width: '2rem',
      height: '2rem',
    },
    [SELECTORS.iconOnlyMd]: {
      width: '2.5rem',
      height: '2.5rem',
    },
    [SELECTORS.iconOnlyLg]: {
      width: '3rem',
      height: '3rem',
    },
    [SELECTORS.iconElements]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.25rem',
      height: '1.25rem',
      fontSize: '1.25rem',
      lineHeight: '1',
      flexShrink: '0',
    },
    [SELECTORS.iconElementsSm]: {
      width: '1rem',
      height: '1rem',
      fontSize: '1rem',
    },
    [SELECTORS.iconElementsMd]: {
      width: '1.25rem',
      height: '1.25rem',
      fontSize: '1.25rem',
    },
    [SELECTORS.iconElementsLg]: {
      width: '1.375rem',
      height: '1.375rem',
      fontSize: '1.375rem',
    },
    [SELECTORS.iconLeft]: {
      marginInlineStart: '-0.125rem',
    },
    [SELECTORS.iconRight]: {
      marginInlineEnd: '-0.125rem',
    },
    [SELECTORS.dataIconInlineStart]: {
      marginInlineStart: '-0.125rem',
    },
    [SELECTORS.dataIconInlineEnd]: {
      marginInlineEnd: '-0.125rem',
    },
    [SELECTORS.variantLight]: {
      '--tw-social-btn-bg': 'var(--tw-social-color-light)',
      '--tw-social-btn-bg-hover': 'var(--tw-social-color-light-hover)',
      '--tw-social-btn-bg-active': 'var(--tw-social-color-light-active)',
      '--tw-social-btn-fg': 'var(--tw-social-color-dark)',
      '--tw-social-btn-fg-hover': 'var(--tw-social-color-dark)',
      '--tw-social-btn-fg-active': 'var(--tw-social-color-dark)',
      '--tw-social-btn-border': 'transparent',
      '--tw-social-btn-ring': 'var(--tw-social-color)',
    },
    [SELECTORS.variantDark]: {
      '--tw-social-btn-bg': 'var(--tw-social-color-dark)',
      '--tw-social-btn-bg-hover': 'var(--tw-social-color-dark-hover)',
      '--tw-social-btn-bg-active': 'var(--tw-social-color-dark-active)',
      '--tw-social-btn-fg': 'var(--tw-social-on-color-dark)',
      '--tw-social-btn-fg-hover': 'var(--tw-social-on-color-dark)',
      '--tw-social-btn-fg-active': 'var(--tw-social-on-color-dark)',
      '--tw-social-btn-border': 'transparent',
      '--tw-social-btn-ring': 'var(--tw-social-color)',
    },
    [SELECTORS.variantOutline]: {
      '--tw-social-btn-bg': 'transparent',
      '--tw-social-btn-bg-hover': 'var(--tw-social-color)',
      '--tw-social-btn-bg-active': 'var(--tw-social-color-outline-active)',
      '--tw-social-btn-fg': 'var(--tw-social-color)',
      '--tw-social-btn-fg-hover': 'var(--tw-social-on-color)',
      '--tw-social-btn-fg-active': '#fff',
      '--tw-social-btn-border': 'var(--tw-social-color)',
      '--tw-social-btn-ring': 'var(--tw-social-color)',
    },
    [SELECTORS.variantInverted]: {
      '--tw-social-btn-bg': 'var(--tw-social-inverted-bg)',
      '--tw-social-btn-bg-hover': 'var(--tw-social-inverted-bg-hover)',
      '--tw-social-btn-bg-active': 'var(--tw-social-inverted-bg-active)',
      '--tw-social-btn-fg': 'var(--tw-social-color)',
      '--tw-social-btn-fg-hover': 'var(--tw-social-color)',
      '--tw-social-btn-fg-active': 'var(--tw-social-color)',
      '--tw-social-btn-border': 'transparent',
      '--tw-social-btn-ring': 'var(--tw-social-color)',
    },
    '@media (prefers-reduced-motion: reduce)': {
      [SELECTORS.button]: {
        transition: 'none',
      },
      [SELECTORS.buttonHover]: {
        transform: 'none',
      },
    },
  };
}

/**
 * Generate provider-scoped button token values.
 * @param {string} name - Provider code.
 * @param {{color: string}} provider - Provider data object.
 * @returns {Record<string, Record<string, string>>}
 */
export function generateProviderComponents(name, provider) {
  const colorTokens = buildProviderColorTokens(provider.color);
  const variants = buildButtonVariantTokens(colorTokens);

  return {
    [`.tw-social-provider-${name}`]: {
      '--tw-social-color': colorTokens.color,
      '--tw-social-color-light': colorTokens.colorLight,
      '--tw-social-color-dark': colorTokens.colorDark,
      '--tw-social-color-hover': colorTokens.colorHover,
      '--tw-social-color-active': colorTokens.colorActive,
      '--tw-social-color-light-hover': colorTokens.colorLightHover,
      '--tw-social-color-light-active': colorTokens.colorLightActive,
      '--tw-social-color-dark-hover': colorTokens.colorDarkHover,
      '--tw-social-color-dark-active': colorTokens.colorDarkActive,
      '--tw-social-color-outline-active': colorTokens.colorOutlineActive,
      '--tw-social-on-color': colorTokens.onColor,
      '--tw-social-on-color-dark': colorTokens.onColorDark,
      '--tw-social-inverted-bg': colorTokens.invertedBg,
      '--tw-social-inverted-bg-hover': colorTokens.invertedBgHover,
      '--tw-social-inverted-bg-active': colorTokens.invertedBgActive,
      '--tw-social-btn-bg': variants.solid.bg,
      '--tw-social-btn-bg-hover': variants.solid.bgHover,
      '--tw-social-btn-bg-active': variants.solid.bgActive,
      '--tw-social-btn-fg': variants.solid.fg,
      '--tw-social-btn-fg-hover': variants.solid.fgHover,
      '--tw-social-btn-fg-active': variants.solid.fgActive,
      '--tw-social-btn-border': variants.solid.border,
      '--tw-social-btn-ring': variants.solid.ring,
    },
  };
}

/**
 * Generate provider color utility classes.
 * @param {string} name - Provider code.
 * @param {{color: string}} provider - Provider data object.
 * @returns {Record<string, Record<string, string>>}
 */
export function generateProviderUtilities(name, provider) {
  const colorTokens = buildProviderColorTokens(provider.color);

  return {
    [`.tw-social-bg-${name}`]: { backgroundColor: colorTokens.color },
    [`.tw-social-bg-${name}-light`]: {
      backgroundColor: colorTokens.colorLight,
    },
    [`.tw-social-bg-${name}-dark`]: { backgroundColor: colorTokens.colorDark },
    [`.tw-social-text-${name}`]: { color: colorTokens.color },
    [`.tw-social-text-${name}-light`]: { color: colorTokens.colorLight },
    [`.tw-social-text-${name}-dark`]: { color: colorTokens.colorDark },
    [`.tw-social-border-${name}`]: { borderColor: colorTokens.color },
    [`.tw-social-border-${name}-light`]: {
      borderColor: colorTokens.colorLight,
    },
    [`.tw-social-border-${name}-dark`]: { borderColor: colorTokens.colorDark },
    [`.tw-social-ring-${name}`]: { '--tw-ring-color': colorTokens.color },
    [`.tw-social-ring-${name}-light`]: {
      '--tw-ring-color': colorTokens.colorLight,
    },
    [`.tw-social-ring-${name}-dark`]: {
      '--tw-ring-color': colorTokens.colorDark,
    },
    [`.tw-social-fill-${name}`]: { fill: colorTokens.color },
    [`.tw-social-fill-${name}-light`]: { fill: colorTokens.colorLight },
    [`.tw-social-fill-${name}-dark`]: { fill: colorTokens.colorDark },
    [`.tw-social-stroke-${name}`]: { stroke: colorTokens.color },
    [`.tw-social-stroke-${name}-light`]: { stroke: colorTokens.colorLight },
    [`.tw-social-stroke-${name}-dark`]: { stroke: colorTokens.colorDark },
  };
}
