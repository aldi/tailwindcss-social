/**
 * Color utility functions
 * Used to generate light/dark variants and check contrast
 */

/**
 * Parse HSL string to object
 * @param {string} hsl - HSL string like 'hsl(210, 50%, 40%)'
 * @returns {{h: number, s: number, l: number}}
 */
export function parseHSL(hsl) {
  const match = hsl.match(/hsl\(([^,]+),\s*([^,]+)%?,\s*([^)]+)%?\)/);
  if (!match) {
    throw new Error(`Invalid HSL string: ${hsl}`);
  }
  return {
    h: parseFloat(match[1]),
    s: parseFloat(match[2]),
    l: parseFloat(match[3]),
  };
}

/**
 * Convert HSL object to string
 * @param {{h: number, s: number, l: number}} hsl
 * @returns {string}
 */
export function toHSLString({ h, s, l }) {
  // Round to 1 decimal place for cleaner CSS output
  const round = (n) => Math.round(n * 10) / 10;
  return `hsl(${round(h)}, ${round(s)}%, ${round(l)}%)`;
}

/**
 * Generate a light variant of a color (for light backgrounds)
 * @param {string} hsl - HSL color string
 * @returns {string} Light variant HSL string
 */
export function findLightColor(hsl) {
  const { h, s, l } = parseHSL(hsl);
  // Set lightness to 96% minimum (like bulma-social)
  const newL = Math.max(l, 96);
  return toHSLString({ h, s, l: newL });
}

/**
 * Generate a dark variant of a color (for dark mode/variants)
 * @param {string} hsl - HSL color string
 * @returns {string} Dark variant HSL string
 */
export function findDarkColor(hsl) {
  const { h, s, l } = parseHSL(hsl);
  // Calculate luminance-adjusted dark color (like bulma-social)
  const baseL = 29;
  const luminance = calculateLuminance(hsl);
  const luminanceDelta = 0.53 - luminance;
  const targetL = Math.round(baseL + luminanceDelta * 53);
  // Use the darker of: calculated target or original lightness
  const newL = Math.min(l, Math.max(baseL, targetL));
  return toHSLString({ h, s, l: newL });
}

/**
 * Calculate relative luminance of an HSL color
 * Used for contrast calculations
 * @param {string} hsl - HSL color string
 * @returns {number} Luminance value 0-1
 */
export function calculateLuminance(hsl) {
  const { h, s, l } = parseHSL(hsl);
  // Convert HSL to RGB
  const rgb = hslToRgb(h / 360, s / 100, l / 100);

  // Calculate relative luminance per WCAG formula
  const [r, g, b] = rgb.map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Convert HSL to RGB
 * @param {number} h - Hue 0-1
 * @param {number} s - Saturation 0-1
 * @param {number} l - Lightness 0-1
 * @returns {number[]} RGB values 0-255
 */
function hslToRgb(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Find the best text color (black or white) for a given background
 * @param {string} hsl - Background HSL color string
 * @returns {string} 'rgba(0, 0, 0, 0.7)' or '#fff'
 */
export function findColorInvert(hsl) {
  const luminance = calculateLuminance(hsl);
  return luminance > 0.55 ? 'rgba(0, 0, 0, 0.7)' : '#fff';
}

/**
 * Darken a color by a percentage
 * @param {string} hsl - HSL color string
 * @param {number} amount - Percentage to darken (0-100)
 * @returns {string}
 */
export function darken(hsl, amount) {
  const { h, s, l } = parseHSL(hsl);
  return toHSLString({ h, s, l: Math.max(0, l - amount) });
}
