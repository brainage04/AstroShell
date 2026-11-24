import type { NavItem } from '../config';
import { withBase } from './withBase';

function stripTrailingSlash(value: string) {
  return value === '/' ? value : value.replace(/\/$/, '');
}

/**
 * The bar splits into pinned links and a menu only when some item is pinned and some is not. With nothing pinned the
 * bar works as before, and with everything pinned there would be nothing for the menu to hold.
 */
export function splitsNav(items: readonly NavItem[]): boolean {
  const pinned = items.filter((item) => item.pinned === true).length;
  return pinned > 0 && pinned < items.length;
}

/** True when the current page is a link that lives only in the menu while the bar is split. */
export function isMenuLinkActive(
  items: readonly NavItem[],
  pathname: string,
  base = import.meta.env.BASE_URL,
): boolean {
  return splitsNav(items) && items.some((item) => item.pinned !== true && isNavItemActive(item, pathname, base));
}

export function isNavItemActive(item: NavItem, pathname: string, base = import.meta.env.BASE_URL): boolean {
  if (item.external) return false;
  const normalizedPathname = stripTrailingSlash(pathname);
  const normalizedTarget = stripTrailingSlash(withBase(item.match ?? item.href, base));
  if (item.activeMode === 'prefix') {
    if (normalizedTarget === stripTrailingSlash(withBase('/', base))) return normalizedPathname === normalizedTarget;
    return normalizedPathname === normalizedTarget || normalizedPathname.startsWith(`${normalizedTarget}/`);
  }
  return normalizedPathname === normalizedTarget;
}
