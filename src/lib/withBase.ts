const ABSOLUTE_OR_FRAGMENT_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;

export function withBase(href: string, base = import.meta.env.BASE_URL): string {
  if (!href || ABSOLUTE_OR_FRAGMENT_URL.test(href)) return href;

  const normalizedBase = base === '/' ? '' : base.replace(/\/$/, '');
  const normalizedHref = href.startsWith('/') ? href : `/${href}`;
  return `${normalizedBase}${normalizedHref}` || '/';
}
