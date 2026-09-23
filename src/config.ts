export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  match?: string;
  activeMode?: 'exact' | 'prefix';
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  external?: boolean;
}

export interface SiteConfig {
  siteName: string;
  navItems: readonly NavItem[];
  sourceHref: string;
  description: string;
  ownerHref: string;
  ownerName: string;
  homeTitle?: string;
  faviconHref?: string;
  faviconType?: string;
  brandLabel?: string;
  brandHref?: string;
  image?: string;
  canonicalHref?: string;
  themeColor?: string;
  preconnectHrefs?: readonly string[];
  creatorHref?: string;
  creatorName?: string;
  year?: number;
  lang?: string;
}
