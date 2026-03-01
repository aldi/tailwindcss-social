import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildButtonVariantTokens,
  buildProviderColorTokens,
} from '../src/tokens.js';
import { findColorInvert } from '../src/utils/colors.js';

test('buildProviderColorTokens derives semantic provider values', () => {
  const color = 'hsl(213.9, 89.3%, 52.2%)';
  const tokens = buildProviderColorTokens(color);

  assert.equal(tokens.color, color);
  assert.equal(tokens.onColor, findColorInvert(color));
  assert.equal(typeof tokens.colorLight, 'string');
  assert.equal(typeof tokens.colorDark, 'string');
  assert.equal(typeof tokens.colorHover, 'string');
  assert.equal(typeof tokens.colorActive, 'string');
  assert.equal(typeof tokens.colorOutlineActive, 'string');
  assert.equal(typeof tokens.invertedBgHover, 'string');
  assert.equal(typeof tokens.invertedBgActive, 'string');
});

test('buildProviderColorTokens handles white inverted branch', () => {
  const tokens = buildProviderColorTokens('hsl(0, 0%, 0%)');

  assert.equal(tokens.invertedBg, '#fff');
  assert.equal(tokens.invertedBgHover, '#f0f0f0');
  assert.equal(tokens.invertedBgActive, '#e5e5e5');
});

test('buildButtonVariantTokens maps provider tokens into variant tokens', () => {
  const providerTokens = buildProviderColorTokens('hsl(210, 12.2%, 16.1%)');
  const variants = buildButtonVariantTokens(providerTokens);

  assert.equal(variants.solid.bg, providerTokens.color);
  assert.equal(variants.solid.fg, providerTokens.onColor);
  assert.equal(variants.light.bg, providerTokens.colorLight);
  assert.equal(variants.dark.bg, providerTokens.colorDark);
  assert.equal(variants.outline.bg, 'transparent');
  assert.equal(variants.outline.fg, providerTokens.color);
  assert.equal(variants.inverted.bg, providerTokens.invertedBg);
  assert.equal(variants.inverted.fg, providerTokens.color);
});
