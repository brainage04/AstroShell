export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  match?: string;
  activeMode?: 'exact' | 'prefix';
}

export interface SiteConfig {
  siteName: string;
  navItems: readonly NavItem[];
  sourceHref: string;
  description: string;
  homeTitle?: string;
  faviconHref?: string;
  faviconType?: string;
  brandLabel?: string;
  brandHref?: string;
  image?: string;
  canonicalHref?: string;
  themeColor?: string;
  preconnectHrefs?: readonly string[];
  ownerHref?: string;
  ownerName?: string;
  creatorHref?: string;
  creatorName?: string;
  lang?: string;
}
