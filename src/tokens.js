import {
  darken,
  findColorInvert,
  findDarkColor,
  findLightColor,
} from './utils/colors.js';

/**
 * Build provider color tokens from an HSL source color.
 * @param {string} color - Provider color in HSL format.
 * @returns {{
 *   color: string,
 *   colorHover: string,
 *   colorActive: string,
 *   colorLight: string,
 *   colorLightHover: string,
 *   colorLightActive: string,
 *   colorDark: string,
 *   colorDarkHover: string,
 *   colorDarkActive: string,
 *   colorOutlineActive: string,
 *   onColor: string,
 *   onColorDark: string,
 *   invertedBg: string,
 *   invertedBgHover: string,
 *   invertedBgActive: string
 * }}
 */
export function buildProviderColorTokens(color) {
  const colorLight = findLightColor(color);
  const colorDark = findDarkColor(color);
  const onColor = findColorInvert(color);
  const onColorDark = findColorInvert(colorDark);
  const invertedBg = onColor;

  return {
    color,
    colorHover: darken(color, 5),
    colorActive: darken(color, 10),
    colorLight,
    colorLightHover: darken(colorLight, 2.5),
    colorLightActive: darken(colorLight, 5),
    colorDark,
    colorDarkHover: darken(colorDark, 5),
    colorDarkActive: darken(colorDark, 10),
    colorOutlineActive: darken(color, 16),
    onColor,
    onColorDark,
    invertedBg,
    invertedBgHover: invertedBg === '#fff' ? '#f0f0f0' : 'rgba(0, 0, 0, 0.8)',
    invertedBgActive: invertedBg === '#fff' ? '#e5e5e5' : 'rgba(0, 0, 0, 0.9)',
  };
}

/**
 * Build semantic button variant tokens from provider color tokens.
 * @param {ReturnType<typeof buildProviderColorTokens>} tokens
 * @returns {{
 *   solid: Record<string, string>,
 *   light: Record<string, string>,
 *   dark: Record<string, string>,
 *   outline: Record<string, string>,
 *   inverted: Record<string, string>
 * }}
 */
export function buildButtonVariantTokens(tokens) {
  return {
    solid: {
      bg: tokens.color,
      bgHover: tokens.colorHover,
      bgActive: tokens.colorActive,
      fg: tokens.onColor,
      fgHover: tokens.onColor,
      fgActive: tokens.onColor,
      border: 'transparent',
      ring: tokens.color,
    },
    light: {
      bg: tokens.colorLight,
      bgHover: tokens.colorLightHover,
      bgActive: tokens.colorLightActive,
      fg: tokens.colorDark,
      fgHover: tokens.colorDark,
      fgActive: tokens.colorDark,
      border: 'transparent',
      ring: tokens.color,
    },
    dark: {
      bg: tokens.colorDark,
      bgHover: tokens.colorDarkHover,
      bgActive: tokens.colorDarkActive,
      fg: tokens.onColorDark,
      fgHover: tokens.onColorDark,
      fgActive: tokens.onColorDark,
      border: 'transparent',
      ring: tokens.color,
    },
    outline: {
      bg: 'transparent',
      bgHover: tokens.color,
      bgActive: tokens.colorOutlineActive,
      fg: tokens.color,
      fgHover: tokens.onColor,
      fgActive: '#fff',
      border: tokens.color,
      ring: tokens.color,
    },
    inverted: {
      bg: tokens.invertedBg,
      bgHover: tokens.invertedBgHover,
      bgActive: tokens.invertedBgActive,
      fg: tokens.color,
      fgHover: tokens.color,
      fgActive: tokens.color,
      border: 'transparent',
      ring: tokens.color,
    },
  };
}
