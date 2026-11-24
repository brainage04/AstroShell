import { describe, expect, it } from 'vitest';
import type { NavItem } from '../config';
import { isMenuLinkActive, isNavItemActive, splitsNav } from './navigation';

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

describe('splitsNav', () => {
  it('is false when no item sets the flag, so the bar keeps working as before', () => {
    expect(splitsNav([home, projects])).toBe(false);
    expect(splitsNav([])).toBe(false);
  });

  it('is false when every flag is false', () => {
    expect(splitsNav([{ ...home, pinned: false }, projects])).toBe(false);
  });

  it('is false when every item is pinned, because the menu would be empty', () => {
    expect(
      splitsNav([
        { ...home, pinned: true },
        { ...projects, pinned: true },
      ]),
    ).toBe(false);
  });

  it('is true when some items are pinned and some are not', () => {
    expect(splitsNav([{ ...home, pinned: true }, projects])).toBe(true);
  });
});

describe('isMenuLinkActive', () => {
  const split = [{ ...home, pinned: true }, projects];

  it('is true on an unpinned page while the bar is split', () => {
    expect(isMenuLinkActive(split, '/projects/', '/')).toBe(true);
  });

  it('is false on a pinned page', () => {
    expect(isMenuLinkActive(split, '/', '/')).toBe(false);
  });

  it('is false when the bar is not split', () => {
    expect(isMenuLinkActive([home, projects], '/projects/', '/')).toBe(false);
  });
});
