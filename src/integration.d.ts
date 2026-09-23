import type { AstroIntegration } from 'astro';
import type { SiteConfig } from './config';

export interface AstroShellOptions {
  /** Site configuration exposed to the shell layout through `virtual:astro-shell/config`. Must be JSON-serialisable. */
  config: SiteConfig;
  /** Stylesheets imported after the shell's global CSS, in order. `./` entries resolve against the Astro project root. */
  styles?: readonly string[];
  /** Inject the shell's `/404` page. Defaults to `true`. */
  notFound?: boolean;
}

export default function astroShell(options: AstroShellOptions): AstroIntegration;
