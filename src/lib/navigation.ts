import type { NavItem } from '../config';
import { withBase } from './withBase';

function stripTrailingSlash(value: string) {
  return value === '/' ? value : value.replace(/\/$/, '');
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
