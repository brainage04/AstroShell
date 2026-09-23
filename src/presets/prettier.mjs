import * as astroPlugin from 'prettier-plugin-astro';

export default {
  plugins: [astroPlugin],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [{ files: '*.astro', options: { parser: 'astro' } }],
};
