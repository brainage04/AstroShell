import { describe, expect, it } from 'vitest';
import type { NavItem } from '../config';
import { isNavItemActive } from './navigation';

const home: NavItem = { name: 'Home', href: '/' };
const projects: NavItem = { name: 'Projects', href: '/projects/', activeMode: 'prefix' };

describe('isNavItemActive', () => {
  it.each([
    { item: home, pathname: '/', base: '/', expected: true },
    { item: home, pathname: '/projects/', base: '/', expected: false },
    { item: home, pathname: '/sub/', base: '/sub/', expected: true },
    { item: home, pathname: '/sub', base: '/sub', expected: true },
    { item: projects, pathname: '/projects', base: '/', expected: true },
    { item: projects, pathname: '/projects/alpha/', base: '/', expected: true },
    { item: projects, pathname: '/projects-archive/', base: '/', expected: false },
    { item: projects, pathname: '/sub/projects/alpha/', base: '/sub/', expected: true },
    { item: projects, pathname: '/projects/alpha/', base: '/sub/', expected: false },
  ])('$item.name at "$pathname" with base "$base" → $expected', ({ item, pathname, base, expected }) => {
    expect(isNavItemActive(item, pathname, base)).toBe(expected);
  });

  it('keeps an exact item inactive on its descendants', () => {
    expect(isNavItemActive({ name: 'Blog', href: '/blog/' }, '/blog/post/', '/')).toBe(false);
  });

  it('keeps a prefix item on the base root from matching every page', () => {
    const root: NavItem = { name: 'Home', href: '/', activeMode: 'prefix' };
    expect(isNavItemActive(root, '/sub/', '/sub/')).toBe(true);
    expect(isNavItemActive(root, '/sub/about/', '/sub/')).toBe(false);
  });

  it('matches against `match` instead of `href`', () => {
    const item: NavItem = { name: 'Docs', href: '/docs/intro/', match: '/docs/', activeMode: 'prefix' };
    expect(isNavItemActive(item, '/docs/guide/', '/')).toBe(true);
  });

  it('never marks external items active', () => {
    expect(isNavItemActive({ name: 'Ext', href: '/', external: true }, '/', '/')).toBe(false);
  });
});
