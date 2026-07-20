import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ignores: ['css/**', 'docs/**', 'node_modules/**', '.git/**'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
];
