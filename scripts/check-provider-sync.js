import { providers } from '../src/providers.js';
import { socialProviders } from '../docs/src/data/socialProviders.js';

function normalizeHSL(value) {
  return value.trim().replace(/\s+/g, '').toLowerCase();
}

function toSourceMap() {
  return new Map(
    Object.entries(providers).map(([code, provider]) => [
      code,
      {
        name: provider.name,
        hsl: normalizeHSL(provider.color),
      },
    ])
  );
}

function toDocsMap() {
  return new Map(
    socialProviders.map((provider) => [
      provider.code,
      {
        name: provider.name,
        hsl: normalizeHSL(provider.hsl),
      },
    ])
  );
}

function getDuplicates(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

function fail(errors) {
  console.error('Provider sync check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

function main() {
  const sourceMap = toSourceMap();
  const docsMap = toDocsMap();
  const errors = [];

  const duplicateDocsCodes = getDuplicates(
    socialProviders.map((provider) => provider.code)
  );

  for (const code of duplicateDocsCodes) {
    errors.push(`Duplicate docs provider code: "${code}"`);
  }

  const allCodes = new Set([...sourceMap.keys(), ...docsMap.keys()]);

  for (const code of [...allCodes].sort()) {
    const sourceProvider = sourceMap.get(code);
    const docsProvider = docsMap.get(code);

    if (!sourceProvider) {
      errors.push(`Missing in src/providers.js: "${code}"`);
      continue;
    }

    if (!docsProvider) {
      errors.push(`Missing in docs/src/data/socialProviders.js: "${code}"`);
      continue;
    }

    if (sourceProvider.name !== docsProvider.name) {
      errors.push(
        `Name mismatch for "${code}" (src="${sourceProvider.name}", docs="${docsProvider.name}")`
      );
    }

    if (sourceProvider.hsl !== docsProvider.hsl) {
      errors.push(
        `HSL mismatch for "${code}" (src="${sourceProvider.hsl}", docs="${docsProvider.hsl}")`
      );
    }
  }

  if (errors.length > 0) {
    fail(errors);
  }

  console.log(`Provider sync check passed (${sourceMap.size} providers).`);
}

main();
