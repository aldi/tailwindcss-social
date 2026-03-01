import assert from 'node:assert/strict';
import test from 'node:test';

import tailwindcssSocial from '../src/index.js';
import { providers } from '../src/providers.js';

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

function hasSelectorFragment(components, fragment) {
  return Object.keys(components).some((selector) =>
    selector.includes(fragment)
  );
}

function findStyleBySelector(components, predicate) {
  for (const [selector, styles] of Object.entries(components)) {
    if (predicate(selector)) {
      return styles;
    }
  }

  return undefined;
}

test('plugin registers namespaced provider and utility classes', () => {
  const components = renderComponents();

  assert.ok(components['.tw-social-btn']);
  assert.ok(components['.tw-social-provider-facebook']);
  assert.ok(components['.tw-social-bg-facebook']);
});

test('button base, size, and icon selectors are scoped to .tw-social-btn', () => {
  const components = renderComponents();
  const componentKeys = Object.keys(components);

  assert.ok(components['.tw-social-btn']);
  assert.ok(components['.tw-social-btn.tw-social-size-sm']);
  assert.ok(components['.tw-social-btn.tw-social-icon-only']);

  assert.ok(
    !componentKeys.some(
      (selector) => selector === '.btn' || selector.startsWith('.btn')
    )
  );
  assert.ok(
    !componentKeys.some(
      (selector) => selector === '.bg-facebook' || selector.startsWith('.bg-')
    )
  );
});

test('button token contract and icon recipe are registered', () => {
  const components = renderComponents();

  assert.ok(components['.tw-social-btn.tw-social-icon-only']);
  assert.ok(
    hasSelectorFragment(components, '.tw-social-btn.tw-social-icon-left svg')
  );
  assert.ok(
    hasSelectorFragment(components, '.tw-social-btn.tw-social-icon-right svg')
  );
  assert.ok(
    hasSelectorFragment(components, '.tw-social-btn [data-icon="inline-start"]')
  );
  assert.ok(
    hasSelectorFragment(components, '.tw-social-btn [data-icon="inline-end"]')
  );

  const baseStyles = components['.tw-social-btn'];
  assert.equal(baseStyles?.display, 'inline-flex');
  assert.equal(baseStyles?.alignItems, 'center');
  assert.equal(baseStyles?.gap, '0.375rem');
  assert.equal(baseStyles?.padding, '0.5rem 0.75rem');
  assert.equal(baseStyles?.fontSize, '0.875rem');
  assert.equal(baseStyles?.lineHeight, '1.25rem');
  assert.equal(baseStyles?.fontWeight, '600');
  assert.equal(baseStyles?.borderRadius, '0.5rem');

  const sizeSmStyles = components['.tw-social-btn.tw-social-size-sm'];
  assert.equal(sizeSmStyles?.padding, '0.375rem 0.625rem');

  const sizeMdStyles = components['.tw-social-btn.tw-social-size-md'];
  assert.equal(sizeMdStyles?.padding, '0.5rem 0.75rem');

  const sizeLgStyles = components['.tw-social-btn.tw-social-size-lg'];
  assert.equal(sizeLgStyles?.padding, '0.625rem 0.875rem');

  const iconOnlyStyles = components['.tw-social-btn.tw-social-icon-only'];
  assert.equal(iconOnlyStyles?.padding, '0');
  assert.equal(iconOnlyStyles?.width, '2.5rem');
  assert.equal(iconOnlyStyles?.height, '2.5rem');

  const iconSmStyles =
    components['.tw-social-btn.tw-social-icon-only.tw-social-size-sm'];
  assert.equal(iconSmStyles?.width, '2rem');
  assert.equal(iconSmStyles?.height, '2rem');

  const iconMdStyles =
    components['.tw-social-btn.tw-social-icon-only.tw-social-size-md'];
  assert.equal(iconMdStyles?.width, '2.5rem');
  assert.equal(iconMdStyles?.height, '2.5rem');

  const iconLgStyles =
    components['.tw-social-btn.tw-social-icon-only.tw-social-size-lg'];
  assert.equal(iconLgStyles?.width, '3rem');
  assert.equal(iconLgStyles?.height, '3rem');

  const iconElementBaseStyles = findStyleBySelector(components, (selector) =>
    selector.startsWith('.tw-social-btn svg,')
  );
  assert.equal(iconElementBaseStyles?.width, '1.25rem');
  assert.equal(iconElementBaseStyles?.height, '1.25rem');

  const iconElementSmStyles = findStyleBySelector(components, (selector) =>
    selector.includes('.tw-social-btn.tw-social-size-sm svg')
  );
  assert.equal(iconElementSmStyles?.width, '1rem');
  assert.equal(iconElementSmStyles?.height, '1rem');

  const iconElementMdStyles = findStyleBySelector(components, (selector) =>
    selector.includes('.tw-social-btn.tw-social-size-md svg')
  );
  assert.equal(iconElementMdStyles?.width, '1.25rem');
  assert.equal(iconElementMdStyles?.height, '1.25rem');

  const iconElementLgStyles = findStyleBySelector(components, (selector) =>
    selector.includes('.tw-social-btn.tw-social-size-lg svg')
  );
  assert.equal(iconElementLgStyles?.width, '1.375rem');
  assert.equal(iconElementLgStyles?.height, '1.375rem');

  const iconLeftStyles = findStyleBySelector(components, (selector) =>
    selector.includes('.tw-social-btn.tw-social-icon-left svg')
  );
  assert.equal(iconLeftStyles?.marginInlineStart, '-0.125rem');

  const iconRightStyles = findStyleBySelector(components, (selector) =>
    selector.includes('.tw-social-btn.tw-social-icon-right svg')
  );
  assert.equal(iconRightStyles?.marginInlineEnd, '-0.125rem');

  const iconInlineStartStyles =
    components['.tw-social-btn [data-icon="inline-start"]'];
  assert.equal(iconInlineStartStyles?.marginInlineStart, '-0.125rem');

  const iconInlineEndStyles =
    components['.tw-social-btn [data-icon="inline-end"]'];
  assert.equal(iconInlineEndStyles?.marginInlineEnd, '-0.125rem');

  const providerStyles = components['.tw-social-provider-facebook'];
  assert.equal(providerStyles?.['--tw-social-color'], providers.facebook.color);
  assert.equal(
    providerStyles?.['--tw-social-btn-bg'],
    providers.facebook.color
  );
  assert.equal(providerStyles?.['--tw-social-on-color'] !== undefined, true);

  const outlinedStyles = components['.tw-social-btn.tw-social-variant-outline'];
  assert.equal(outlinedStyles?.['--tw-social-btn-bg'], 'transparent');
  assert.equal(
    outlinedStyles?.['--tw-social-btn-fg-hover'],
    'var(--tw-social-on-color)'
  );
});

test('providers option limits output to selected providers', () => {
  const components = renderComponents({ providers: ['facebook'] });

  assert.ok(components['.tw-social-btn']);
  assert.ok(components['.tw-social-provider-facebook']);
  assert.ok(components['.tw-social-bg-facebook']);
  assert.equal(components['.tw-social-provider-github'], undefined);
  assert.equal(components['.tw-social-bg-github'], undefined);
});

test('providers option rejects non-array values', () => {
  assert.throws(
    () => renderComponents({ providers: 'facebook' }),
    /must be an array of provider names/i
  );
});

test('providers option rejects unknown provider names', () => {
  assert.throws(
    () => renderComponents({ providers: ['facebook', 'invalid'] }),
    /unknown provider name\(s\): invalid/i
  );
});

test('providers option rejects inherited object-key names', () => {
  assert.throws(
    () => renderComponents({ providers: ['__proto__'] }),
    /unknown provider name\(s\): __proto__/i
  );
});
