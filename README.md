# AstroShell

Shared Astro integration, layout, navigation, footer, 404 page, components, design tokens, tool presets and CI workflows used by the sites in this workspace, built on [WebTUI](https://webtui.ironclad.sh/).

## Requirements

- Node.js 24
- Astro `^7.1.5`
- `@webtui/css` `^0.1.9`

## Installation

```bash
npm install @brainage04/astro-shell
```

## Usage

Register the integration in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import astroShell from '@brainage04/astro-shell';
import { siteConfig } from './src/site.config.ts';

export default defineConfig({
  integrations: [
    astroShell({
      config: siteConfig,
      styles: ['@brainage04/astro-shell/themes/rose.css', './src/styles/site.css'],
    }),
  ],
});
```

Describe the site once in `src/site.config.ts`:

```ts
import type { SiteConfig } from '@brainage04/astro-shell/config';

export const siteConfig = {
  siteName: 'Example',
  description: 'Example site',
  sourceHref: 'https://github.com/example/site',
  ownerHref: 'https://github.com/example',
  ownerName: 'example',
  navItems: [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects/', activeMode: 'prefix' },
  ],
} satisfies SiteConfig;
```

Use the shell layout directly in pages. The home page omits `title`; its document title is `homeTitle` (default `siteName`). Other pages render `<title> | <siteName>`.

```astro
---
import SiteLayout from '@brainage04/astro-shell/components/SiteLayout.astro';
import TerminalPanel from '@brainage04/astro-shell/components/TerminalPanel.astro';
---

<SiteLayout>
  <TerminalPanel title="Hello">Shared shell content.</TerminalPanel>
</SiteLayout>
```

`SiteLayout` props, all optional: `title`, `description` (default `config.description`), `image` (default `config.image`), `ogType` (`'website'` | `'article'`, default `'website'`), `canonicalHref` (default `config.canonicalHref`). A `head` slot adds extra head elements.

Local links and assets passed to the shell are prefixed with Astro's configured base path. Use `withBase` for application-owned links:

```ts
import { withBase } from '@brainage04/astro-shell/withBase';
```

### Integration options

| option     | type                | default  | effect                                                                                                                                                                                                                   |
| ---------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config`   | `SiteConfig`        | required | Exposed to the shell as `virtual:astro-shell/config`. Must be JSON-serialisable.                                                                                                                                         |
| `styles`   | `readonly string[]` | `[]`     | Imported after the shell's `global.css`, in order, so site rules win the cascade. Entries starting with `./` or `../` resolve against the Astro project root; package specifiers (e.g. a theme) are imported as written. |
| `notFound` | `boolean`           | `true`   | Injects `/404` rendering `NotFoundPage` inside `SiteLayout`. Set `false` to ship your own `src/pages/404.astro`.                                                                                                         |

The integration also applies the GitHub Pages environment: `PUBLIC_SITE_URL` (when set) becomes `site`, and `base` is `PUBLIC_BASE_PATH` or `/`.

### `SiteConfig`

Required: `siteName`, `description`, `sourceHref`, `navItems`, `ownerHref`, `ownerName`.
Optional: `homeTitle`, `brandLabel`, `brandHref`, `faviconHref`, `faviconType`, `image`, `canonicalHref`, `themeColor` (dark theme browser colour, default `#151515`), `themeColorLight` (light theme browser colour, default `#f5f5f2`), `preconnectHrefs`, `creatorHref`, `creatorName`, `year` (footer copyright year, default current year), `lang` (default `en`).

`NavItem`: `{ name, href, external?, match?, activeMode?: 'exact' | 'prefix' }`. `isNavItemActive(item, pathname, base?)` from `@brainage04/astro-shell/navigation` exposes the header's matching rule.

## Components

- `components/SiteLayout.astro`, `components/SiteHeader.astro`, `components/SiteFooter.astro`

  The header shows `brandLabel` (when set), the links and a light/dark theme button in one row. On phones (40rem and narrower), and at any width where the links do not fit, it shows a square menu button on the left, `brandLabel` or `siteName` in the middle and the theme button on the right. The menu button opens the links in a drawer (a modal `<dialog>`) that slides in from the left. A link, the backdrop, the close button and Escape close it. The page follows the system colour scheme until the visitor presses the theme button. The pick is stored in `localStorage` under `astro-shell.theme`.

- `components/PageHeader.astro` – `{ title }`
- `components/TerminalPanel.astro` – `{ title?, class?, id?, shear? }`
- `components/NotFoundPage.astro` – `{ message?, homeHref?, homeLabel?, secondaryHref?, secondaryLabel? }`
- `components/StatCard.astro` – `{ label, value?, valueId?, note?, class? }`, renders `.stat-card` with an `<output>` (defaults to `—`) for script-updated values.
- `components/ProfileCard.astro` – `{ name, avatar, avatarAlt?, socials }`. Avatar frame, `h1` name row with social icons, default slot for the copy under the name. `avatar` and local `socials[].icon`/`href` are public paths (base applied). Social icons are drawn white, and the light theme inverts them. `SocialLink` is exported from `@brainage04/astro-shell/config`: `{ name, href, icon, iconWidth, iconHeight, external? }`.

`ProfileCard` layout can be tuned per site with custom properties on `.profile-card` (defaults in brackets):

| property                   | default                                                                                                                      |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `--profile-avatar-column`  | `minmax(8rem, 13rem)`                                                                                                        |
| `--profile-gap`            | `clamp(1.5rem, 5vw, 3.5rem)`                                                                                                 |
| `--profile-background`     | `linear-gradient(110deg, color-mix(in srgb, var(--accent-primary) 7%, transparent), transparent 48%), var(--surface-raised)` |
| `--profile-copy-gap`       | `0.9rem`                                                                                                                     |
| `--profile-name-gap`       | `0.7rem 1.25rem`                                                                                                             |
| `--profile-name-size`      | `clamp(2rem, 5vw, 3.5rem)`                                                                                                   |
| `--profile-name-leading`   | `0.98`                                                                                                                       |
| `--profile-name-tracking`  | `-0.055em`                                                                                                                   |
| `--profile-socials-offset` | `0 -0.125rem`                                                                                                                |

## Styles and tokens

`global.css` is loaded by `SiteLayout`. It imports the WebTUI base plus typography, button, badge, separator, pre and box utilities, and provides the shell classes (`.terminal-panel`, `.panel-header`, `.page-header`, `.action-button`, `.action-button--ghost`, `.hero-actions`, `.stack`, `.grid`, `.field`, `.control-card`, `.note-card`, `.stat-card`, `.site-badge`, `.muted`, `.sr-only`, `.skip-link`) and these utilities:

- `.meta-row` – wrapping row of small uppercase mono labels.
- `.section-heading` – heading on the left, optional link or `p` on the right, subtle bottom rule.
- `.chip-list` – unstyled `ul` of mono chips. Tune with `--chip-font-size`, `--chip-padding`, `--chip-gap`, `--chip-color`, `--chip-tint` (accent mix percentage).
- `.table-wrap` – bordered horizontal-scroll wrapper. Add `.table-wrap--stack` to turn rows into stacked cards at ≤640px, labelled from `td[data-label]`.
- A global `prefers-reduced-motion: reduce` block disables animations, transitions and smooth scrolling.

Themes are plain stylesheets listed in `styles`: `@brainage04/astro-shell/themes/rose.css` is the rose/lilac palette shared by several sites. Every colour token holds a light and a dark value with `light-dark()`, so a theme or site palette needs both: `--background0: light-dark(#f5f5f2, #151515);`.

`light-dark()` works in Chrome and Edge 123, Firefox 120 and Safari 17.5 or newer. Older browsers treat every token that uses it as unset, so the page loses its palette there. The shell has no fallback for them.

Colour tokens (set on `:root`/`html:root` in a theme or site stylesheet):

| token                | light                                      | dark                                       | used for                         |
| -------------------- | ------------------------------------------ | ------------------------------------------ | -------------------------------- |
| `--background0..3`   | `#f5f5f2`, `#ebebe6`, `#deded7`, `#c8c8c0` | `#151515`, `#1f1f1f`, `#2a2a2a`, `#3a3a3a` | page, surfaces, controls         |
| `--foreground0..2`   | `#151515`, `#333333`, `#5c5c5c`            | `#f5f5f5`, `#d7d7d7`, `#9f9f9f`            | text, muted text                 |
| `--accent-primary`   | `#00618f`                                  | `#8bd5ff`                                  | links, active nav, focus accents |
| `--accent-secondary` | `#b0245a`                                  | `#f36f9f`                                  | second accent                    |
| `--accent-highlight` | `#7d5a00`                                  | `#f7d774`                                  | focus outline, stat values       |
| `--danger`           | `#b42318`                                  | `#ff928a`                                  | invalid inputs                   |
| `--shadow-raised`    | `0 1.25rem 3rem rgb(0 0 0 / 12%)`          | `0 1.25rem 3rem rgb(0 0 0 / 28%)`          | raised panels                    |

Other tokens. The derived colours follow the light or dark value of the tokens they come from.

| token                                                          | default                                     |
| -------------------------------------------------------------- | ------------------------------------------- |
| `--font-mono`                                                  | `'Courier New', Courier, monospace`         |
| `--surface` / `--surface-raised`                               | `var(--background1)` / `var(--background2)` |
| `--border-subtle` / `--border-strong`                          | `--foreground2` at 34% / 68%                |
| `--panel-bg` / `--panel-border`                                | `--surface` at 92% / `var(--border-strong)` |
| `--control-bg`, `--control-border`, `--control-height`         | buttons and number inputs, height `2.75rem` |
| `--site-main-width`, `--site-nav-width`, `--site-footer-width` | `70rem`, `70rem`, `72rem`                   |
| `--site-grid-min`                                              | `19rem` (`.grid` column minimum)            |

## Tool presets

```js
// eslint.config.js
export { default } from '@brainage04/astro-shell/eslint';
```

```js
// prettier.config.mjs
export { default } from '@brainage04/astro-shell/prettier';
```

```json
// tsconfig.json
{
  "extends": "@brainage04/astro-shell/tsconfig.json",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

The shell depends on `@eslint/js`, `eslint-plugin-astro`, `typescript-eslint` and `prettier-plugin-astro`; sites keep `eslint`, `prettier`, `typescript`, `@astrojs/check`, `astro` and (if used) `vitest`.

## Reusable workflows

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    uses: brainage04/AstroShell/.github/workflows/site-deploy.yml@v0.5.2
    permissions:
      contents: read
      pages: write
      id-token: write
```

```yaml
# .github/workflows/validate.yml
name: Validate

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate:
    uses: brainage04/AstroShell/.github/workflows/site-validate.yml@v0.5.2
    permissions:
      contents: read
```

- `site-validate.yml` runs `npm ci`, `check`, `lint`, `format:check`, `npm test --if-present` and `build` on Node 24.
- `site-deploy.yml` builds with `withastro/action`, deriving `PUBLIC_SITE_URL`/`PUBLIC_BASE_PATH` from the repository (user sites deploy to `/`, project sites to `/<repo>`), then deploys to the `github-pages` environment. Input `ref` (optional) builds a specific ref instead of the triggering commit.
- `package-test.yml` runs `npm ci` and `npm test` on Node 24 for a package other than the site.
- All three workflows take an optional `path` input (default `.`): the directory holding the `package.json` and lockfile, relative to the repository root. Use it when the site lives in a subdirectory of a repository whose root is something else. Such a repository can test its root package in both workflows and deploy only when the tests pass:

  ```yaml
  jobs:
    test:
      uses: brainage04/AstroShell/.github/workflows/package-test.yml@v0.5.2
      permissions:
        contents: read
    deploy:
      needs: test
      uses: brainage04/AstroShell/.github/workflows/site-deploy.yml@v0.5.2
      with:
        path: site
      permissions:
        contents: read
        pages: write
        id-token: write
  ```

- The examples use the release tag for readability. Callers can pin the release commit instead, with the tag as a comment (`site-deploy.yml@<commit sha> # v0.5.2`). Dependabot's `github-actions` updates bump both. Every third-party action in these workflows is pinned the same way.

## Migrating from 0.5

1. The page follows the system's light or dark setting until the visitor presses the header's theme button. Every colour token holds a light and a dark value with `light-dark()`. Give each colour token a site or theme sets a light and a dark value. A plain hex value stays the same in both schemes, next to the shell's light defaults for the tokens the site does not set.
2. Add `themeColorLight` to `SiteConfig`: the browser bar colour in the light theme (`themeColor` stays the dark one).
3. `ProfileCard` inverts its social icons in the light theme, since they are expected to be white artwork. Coloured icons need a site rule that outranks the shell's (specificity 0,4,1), such as `html:root:root .profile-card .socials img { filter: none; }`.
4. `SiteHeader` has a required `title` prop: the title between the menu and theme buttons, and at the top of the drawer. `SiteLayout` passes `siteName`.
5. The header markup changed. The row is `.header-bar` inside `header.site-header`, which now carries `data-has-brand`, the links are `nav.nav-links`, and a `dialog.site-drawer` holds them on phones. Site styles that targeted `.site-header nav` or `nav[data-has-brand]` need the new selectors.

## Migrating from 0.4

1. Add the integration to `astro.config.mjs` and delete the site's own `PUBLIC_SITE_URL`/`PUBLIC_BASE_PATH` handling.
2. Delete `src/layouts/SiteLayout.astro` wrappers and `src/pages/404.astro`; import `@brainage04/astro-shell/components/SiteLayout.astro` directly. The layout no longer accepts `SiteConfig` props.
3. Home pages drop `title="Home"` (the magic value is gone); other pages keep `title`.
4. `SiteConfig.ownerHref` and `ownerName` are required (the footer no longer defaults to brainage04). Remove fields that are `undefined`, `[]`, equal to the default, and nav `match` values equal to `href`.
5. Move site stylesheets into the integration's `styles` option instead of importing them in a layout.
6. Rename tokens (old names are removed, no aliases):

   | 0.4                               | 0.5                                        |
   | --------------------------------- | ------------------------------------------ |
   | `--accent-cyan`                   | `--accent-primary`                         |
   | `--accent`                        | `--accent-secondary`                       |
   | `--accent-yellow`                 | `--accent-highlight`                       |
   | `--accent-green`                  | removed (use a local custom property)      |
   | `--shadow-soft`, `--panel-shadow` | `--shadow-raised`                          |
   | `--font-body`, `--font-display`   | `--font-mono` (`--font-family` follows it) |

7. Replace a duplicated rose palette block with `@brainage04/astro-shell/themes/rose.css` in `styles`.
8. Replace local copies of the new utilities (`.meta-row`, `.section-heading`, `.chip-list`, `.table-wrap`, `.stat-card` internals, reduced-motion blocks that only disable transitions) with the shared ones.
9. `<button class="action-button">` now renders exactly like `<a class="action-button">`: drop `is-="button"` and height/padding workarounds.
10. The scanline overlay sits behind content (`z-index: -1`); delete `body > * { position: relative; z-index: 1 }` workarounds.
11. Switch `eslint.config.js`, `prettier.config.mjs` and `tsconfig.json` to the presets and drop the devDependencies the shell now supplies.
12. Replace `deploy.yml`/`validate.yml` bodies with the reusable workflow callers above.

## Development

```bash
npm ci
```

## Validation

```bash
npm run check
npm run lint
npm run format:check
npm test
npm run pack:check
```

`npm run release:check` runs the complete pre-publish validation sequence. `.github/workflows/validate.yml` runs it on every pull request and every push to `main`, and the "Require checks" ruleset on `main` requires its `validate` check before a pull request merges (repository admins may bypass it).

Dependabot checks npm packages and GitHub Actions daily and waits 3 days after a release before it proposes it. `.github/workflows/dependabot-auto-merge.yml` turns on auto-merge (squash) for its minor and patch npm updates, so they merge once Validate passes. Major updates and GitHub Actions updates stay open for review.

## Deployment

`npm run publish:package` publishes the package to npm (`prepublishOnly` runs `release:check`). `.github/workflows/publish.yml` provides the same release path through npm trusted publishing. It runs when a GitHub release is published, and fails unless the release tag is `v` followed by the `package.json` version.
