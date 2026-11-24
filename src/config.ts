export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
  match?: string;
  activeMode?: 'exact' | 'prefix';
  /**
   * Keeps the link in the bar on wide screens while unpinned links move to the menu drawer. Phones and bars too
   * narrow for the pinned links show every link in the drawer. No item pinned: the bar works as it did before.
   */
  pinned?: boolean;
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
  /** Browser UI colour in the light theme; `themeColor` is the dark theme's. */
  themeColorLight?: string;
  themeColor?: string;
  preconnectHrefs?: readonly string[];
  creatorHref?: string;
  creatorName?: string;
  year?: number;
  lang?: string;
}
