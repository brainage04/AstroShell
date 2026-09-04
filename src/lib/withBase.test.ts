import { describe, expect, it } from 'vitest';
import { withBase } from './withBase';

describe('withBase', () => {
  it.each([
    { href: 'about', base: '/', expected: '/about' },
    { href: '/about', base: '/portfolio/', expected: '/portfolio/about' },
    { href: 'assets/logo.svg', base: '/portfolio', expected: '/portfolio/assets/logo.svg' },
    { href: '/', base: '/portfolio/', expected: '/portfolio/' },
    { href: '', base: '/portfolio/', expected: '' },
  ])('resolves "$href" against "$base"', ({ href, base, expected }) => {
    expect(withBase(href, base)).toBe(expected);
  });

  it.each(['https://example.com/docs', 'mailto:hello@example.com', '//cdn.example.com/app.js', '#content'])(
    'leaves non-local hrefs unchanged: %s',
    (href) => {
      expect(withBase(href, '/portfolio/')).toBe(href);
    },
  );
});
