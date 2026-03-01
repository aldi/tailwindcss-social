import assert from 'node:assert/strict';
import test from 'node:test';

import tailwindcssSocial from '../src/index.js';

function renderComponents(options) {
  let components = {};
  const plugin = tailwindcssSocial(options);

  plugin({
    addComponents(value) {
      components = value;
    },
  });

  return components;
}

test('emits required namespaced selectors and CSS variable contract', () => {
  const components = renderComponents();

  const requiredSelectors = [
    '.tw-social-btn',
    '.tw-social-btn.tw-social-size-sm',
    '.tw-social-btn.tw-social-size-md',
    '.tw-social-btn.tw-social-size-lg',
    '.tw-social-btn.tw-social-icon-only',
    '.tw-social-btn.tw-social-variant-light',
    '.tw-social-btn.tw-social-variant-dark',
    '.tw-social-btn.tw-social-variant-outline',
    '.tw-social-btn.tw-social-variant-inverted',
    '.tw-social-provider-facebook',
    '.tw-social-bg-facebook',
    '.tw-social-text-facebook',
    '.tw-social-border-facebook',
    '.tw-social-ring-facebook',
    '.tw-social-fill-facebook',
    '.tw-social-stroke-facebook',
  ];

  for (const selector of requiredSelectors) {
    assert.ok(components[selector], `Missing selector: ${selector}`);
  }

  const providerContract = components['.tw-social-provider-facebook'];
  const requiredVariables = [
    '--tw-social-color',
    '--tw-social-color-light',
    '--tw-social-color-dark',
    '--tw-social-on-color',
    '--tw-social-btn-bg',
    '--tw-social-btn-fg',
    '--tw-social-btn-border',
    '--tw-social-btn-ring',
  ];

  for (const variableName of requiredVariables) {
    assert.ok(
      providerContract[variableName] !== undefined,
      `Missing provider variable: ${variableName}`
    );
  }
});

test('does not emit legacy v0 selector prefixes', () => {
  const components = renderComponents();
  const selectors = Object.keys(components).filter((selector) =>
    selector.startsWith('.')
  );

  assert.ok(!selectors.some((selector) => selector === '.btn'));
  assert.ok(!selectors.some((selector) => selector.startsWith('.btn-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.bg-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.text-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.border-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.ring-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.fill-')));
  assert.ok(!selectors.some((selector) => selector.startsWith('.stroke-')));
});
